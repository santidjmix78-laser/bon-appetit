import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ActiveTimersBar } from '../components/ActiveTimersBar';
import { CulinaryTermHints } from '../components/CulinaryTermHints';
import { FeelingPicker } from '../components/FeelingPicker';
import { StepTimer } from '../components/StepTimer';
import { useApp } from '../context/AppContext';
import type { CookingLevel, Feeling } from '../types';
import { composeStepHeatText, recipeStepKey } from '../utils/cookAssist';
import { COOKING_LEVEL_OPTIONS, getFoodName, getRecipeById } from '../utils/helpers';
import { getSelectedMealType } from '../utils/mealSession';
import {
  compatibleMethods,
  filterTermIdsForText,
  getMethodSteps,
  getStepsForLevel,
  interpolateStepQuantities,
  mapStepIndexToLevel,
} from '../utils/recipeModel';
import { pickCookingMethod } from '../utils/recommend';

type SavePrompt = {
  stepKey: string;
  similarKey?: string;
  usedSeconds: number;
  recommendedSeconds: number;
  usedTemp?: number;
  recommendedTemp?: number;
};

export function CookModePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    state,
    addMealEntry,
    setFeeling,
    getCookTweak,
    saveCookTweak,
    clearCookTweak,
  } = useApp();
  const recipe = id ? getRecipeById(id, state.customRecipes) : undefined;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [entryId, setEntryId] = useState<string | null>(null);
  const [sessionLevel, setSessionLevel] = useState<CookingLevel>(
    state.cookingLevel,
  );
  const [sessionSeconds, setSessionSeconds] = useState<Record<string, number>>(
    {},
  );
  const [sessionTemp, setSessionTemp] = useState<Record<string, number>>({});
  const [savePrompt, setSavePrompt] = useState<SavePrompt | null>(null);

  const methodParam = searchParams.get('method');
  const servingsParam = Number(searchParams.get('servings'));
  const servings =
    Number.isFinite(servingsParam) && servingsParam > 0 ? servingsParam : 1;

  const methodsOk = useMemo(() => {
    if (!recipe) return [];
    return compatibleMethods(recipe, state.equipmentIds);
  }, [recipe, state.equipmentIds]);

  const method = useMemo(() => {
    if (!recipe) return null;
    if (methodParam) {
      const found = methodsOk.find((m) => m.id === methodParam);
      if (found) return found;
    }
    return (
      pickCookingMethod(recipe, state.equipmentIds).method ??
      methodsOk[0] ??
      null
    );
  }, [recipe, methodParam, methodsOk, state.equipmentIds]);

  const structuredSteps = useMemo(() => {
    if (!recipe || !method) return [];
    return getMethodSteps(method, recipe);
  }, [recipe, method]);

  const levelSteps = useMemo(() => {
    return getStepsForLevel(structuredSteps, sessionLevel).map((s) => {
      const withQty = interpolateStepQuantities(
        s.resolvedText,
        recipe!,
        servings,
      );
      const body = composeStepHeatText(
        withQty,
        s.heatLevel,
        sessionLevel,
        state.stovePower,
      );
      return {
        ...s,
        resolvedText: body.trim(),
        termIds: filterTermIdsForText(s.termIds, body),
      };
    });
  }, [structuredSteps, sessionLevel, state.stovePower, recipe, servings]);

  if (!recipe) {
    return (
      <div className="page">
        <p>Receta no encontrada.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  if (!method) {
    return (
      <div className="page">
        <p>No tienes el equipamiento necesario para cocinar esta receta ahora.</p>
        <Link to={`/receta/${recipe.id}`}>Volver a la receta</Link>
      </div>
    );
  }

  const total = levelSteps.length;
  const isLast = step >= total - 1;
  const current = levelSteps[step];
  const levelLabel =
    sessionLevel === 'beginner'
      ? 'Pepper te enseña'
      : sessionLevel === 'advanced'
        ? 'Pepper dirige'
        : 'Pepper te guía';

  const timerId = current
    ? `recipe:${recipe.id}:${method.id}:${current.id}`
    : '';
  const stepKey = current
    ? recipeStepKey(recipe.id, method.id, current.id)
    : '';
  const recommendedSeconds = current?.timerSeconds ?? 0;
  const recommendedTemp = current?.temperatureC;
  const saved = current
    ? getCookTweak(recipe.id, method.id, current.id, current.similarKey)
    : null;
  const effectiveSeconds =
    sessionSeconds[stepKey] ?? saved?.seconds ?? recommendedSeconds;
  const effectiveTemp =
    sessionTemp[stepKey] ?? saved?.temperatureC ?? recommendedTemp ?? null;

  function finish() {
    const mains = recipe!.ingredients
      .filter((i) => !i.optional)
      .slice(0, 4)
      .map((i) => getFoodName(i.foodId, state.customFoods));

    const entry = addMealEntry({
      text: recipe!.name,
      mealType: getSelectedMealType(),
      recipeId: recipe!.id,
      mainIngredients: mains,
    });
    setEntryId(entry.id);
    setDone(true);
  }

  function onFeeling(f: Feeling) {
    setFeeling(recipe!.id, f, entryId ?? undefined);
  }

  function tryAdvance() {
    const timeChanged =
      current?.timerSeconds != null &&
      effectiveSeconds > 0 &&
      effectiveSeconds !== recommendedSeconds;
    const tempChanged =
      recommendedTemp != null &&
      effectiveTemp != null &&
      effectiveTemp !== recommendedTemp;

    if (timeChanged || tempChanged) {
      setSavePrompt({
        stepKey,
        similarKey: current?.similarKey,
        usedSeconds: effectiveSeconds || recommendedSeconds,
        recommendedSeconds,
        usedTemp: effectiveTemp ?? undefined,
        recommendedTemp: recommendedTemp,
      });
      return;
    }
    if (isLast) finish();
    else setStep((s) => s + 1);
  }

  function dismissSave(choice: 'once' | 'recipe' | 'similar' | 'discard') {
    if (!savePrompt) return;

    if (choice === 'discard') {
      // Descartar aprendizaje: quitar overrides previos de este paso/similar
      // y no persistir el valor modificado. La sesión actual ya usó el valor;
      // al salir, la recomendación original vuelve a ser la referencia.
      clearCookTweak('recipe', savePrompt.stepKey);
      if (savePrompt.similarKey) {
        clearCookTweak('similar', savePrompt.similarKey);
      }
      setSessionSeconds((prev) => {
        const next = { ...prev };
        delete next[savePrompt.stepKey];
        return next;
      });
      setSessionTemp((prev) => {
        const next = { ...prev };
        delete next[savePrompt.stepKey];
        return next;
      });
      setSavePrompt(null);
      if (isLast) finish();
      else setStep((s) => s + 1);
      return;
    }

    const tweak: { seconds?: number; temperatureC?: number } = {};
    if (
      savePrompt.usedSeconds > 0 &&
      savePrompt.usedSeconds !== savePrompt.recommendedSeconds
    ) {
      tweak.seconds = savePrompt.usedSeconds;
    }
    if (
      savePrompt.usedTemp != null &&
      savePrompt.recommendedTemp != null &&
      savePrompt.usedTemp !== savePrompt.recommendedTemp
    ) {
      tweak.temperatureC = savePrompt.usedTemp;
    }
    // Conservar el otro valor ya guardado si solo cambia uno
    if (tweak.seconds == null && saved?.seconds != null) {
      tweak.seconds = saved.seconds;
    }
    if (tweak.temperatureC == null && saved?.temperatureC != null) {
      tweak.temperatureC = saved.temperatureC;
    }

    if (choice === 'recipe' && (tweak.seconds != null || tweak.temperatureC != null)) {
      saveCookTweak('recipe', savePrompt.stepKey, tweak);
    } else if (
      choice === 'similar' &&
      savePrompt.similarKey &&
      (tweak.seconds != null || tweak.temperatureC != null)
    ) {
      saveCookTweak('similar', savePrompt.similarKey, tweak);
    }
    // 'once': no persiste; el valor de sesión ya está aplicado
    setSavePrompt(null);
    if (isLast) finish();
    else setStep((s) => s + 1);
  }

  if (done) {
    return (
      <div className="page page--cook done-screen">
        <img
          src="/assets/pepper/pepper-easy.png"
          alt=""
          className="pepper-done-img"
          width={96}
          height={96}
        />
        <h1>¡Listo!</h1>
        <p className="subtitle">Has registrado: {recipe.name}</p>
        <FeelingPicker
          value={state.recipeFeelings[recipe.id]}
          onChange={onFeeling}
        />
        <button
          type="button"
          className="btn btn--primary btn--block btn--xl"
          onClick={() => navigate('/')}
        >
          Volver al inicio
        </button>
        <Link to="/semana" className="text-link center">
          Ver mi semana →
        </Link>
      </div>
    );
  }

  const hasOverride =
    (saved?.seconds != null && saved.seconds !== recommendedSeconds) ||
    (saved?.temperatureC != null &&
      recommendedTemp != null &&
      saved.temperatureC !== recommendedTemp) ||
    sessionSeconds[stepKey] != null ||
    sessionTemp[stepKey] != null;

  return (
    <div className="page page--cook">
      <header className="cook-header">
        <button
          type="button"
          className="back-link"
          onClick={() => navigate(`/receta/${recipe.id}`)}
        >
          ← Salir
        </button>
        <div className="cook-level-row">
          <label htmlFor="session-level" className="cook-level-label">
            Nivel:
          </label>
          <select
            id="session-level"
            className="input input--inline"
            value={sessionLevel}
            onChange={(e) => {
              const next = e.target.value as CookingLevel;
              const from = getStepsForLevel(structuredSteps, sessionLevel);
              const to = getStepsForLevel(structuredSteps, next);
              setStep((idx) => mapStepIndexToLevel(from, idx, to));
              setSessionLevel(next);
            }}
          >
            {COOKING_LEVEL_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <p className="cook-progress">
          {levelLabel} · Paso {step + 1} de {total}
          {method.id !== 'default' ? ` · ${method.label}` : ''}
        </p>
        <div className="progress-bar" aria-hidden>
          <div
            className="progress-bar__fill"
            style={{ width: `${((step + 1) / Math.max(total, 1)) * 100}%` }}
          />
        </div>
        <h1 className="cook-title">{recipe.name}</h1>
      </header>

      <ActiveTimersBar excludeId={timerId} />

      {savePrompt && (
        <div className="card cook-save-prompt">
          <p>
            {(() => {
              const timeChanged =
                savePrompt.usedSeconds > 0 &&
                savePrompt.usedSeconds !== savePrompt.recommendedSeconds;
              const tempChanged =
                savePrompt.usedTemp != null &&
                savePrompt.recommendedTemp != null &&
                savePrompt.usedTemp !== savePrompt.recommendedTemp;
              const parts: string[] = [];
              if (timeChanged) {
                parts.push(
                  `${Math.round(savePrompt.usedSeconds / 60)} min en lugar de ${Math.round(savePrompt.recommendedSeconds / 60)} min`,
                );
              }
              if (tempChanged) {
                parts.push(
                  `${savePrompt.usedTemp} °C en lugar de ${savePrompt.recommendedTemp} °C`,
                );
              }
              return `Has usado ${parts.join(' y ')}. ¿Quieres que Pepper recuerde este ajuste?`;
            })()}
          </p>
          <div className="cook-save-prompt__actions">
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => dismissSave('once')}
            >
              Solo esta vez
            </button>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => dismissSave('recipe')}
            >
              Para esta receta
            </button>
            {savePrompt.similarKey && (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => dismissSave('similar')}
              >
                Preparaciones similares
              </button>
            )}
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => dismissSave('discard')}
            >
              No guardar
            </button>
          </div>
        </div>
      )}

      <div className="cook-step card">
        <p className="cook-step__text">{current?.resolvedText}</p>
        <CulinaryTermHints termIds={current?.termIds} />
        {recommendedSeconds > 0 && (
          <StepTimer
            timerId={timerId}
            label={current?.timerLabel || 'Temporizador'}
            recommendedSeconds={recommendedSeconds}
            seconds={effectiveSeconds}
            meta={{
              recipeId: recipe.id,
              recipeName: recipe.name,
              phaseId: current?.phaseId,
            }}
            onSecondsChange={(s) =>
              setSessionSeconds((prev) => ({ ...prev, [stepKey]: s }))
            }
            temperatureC={effectiveTemp}
            onTemperatureChange={
              recommendedTemp != null
                ? (c) =>
                    setSessionTemp((prev) => ({ ...prev, [stepKey]: c }))
                : undefined
            }
            showReset={hasOverride}
            onResetRecommended={() => {
              setSessionSeconds((prev) => {
                const next = { ...prev };
                delete next[stepKey];
                return next;
              });
              setSessionTemp((prev) => {
                const next = { ...prev };
                delete next[stepKey];
                return next;
              });
              clearCookTweak('recipe', stepKey);
              if (current?.similarKey) {
                clearCookTweak('similar', current.similarKey);
              }
            }}
          />
        )}
      </div>

      <div className="cook-actions">
        {step > 0 && (
          <button
            type="button"
            className="btn btn--ghost btn--block"
            onClick={() => setStep((s) => s - 1)}
          >
            Anterior
          </button>
        )}
        {!isLast ? (
          <button
            type="button"
            className="btn btn--primary btn--block btn--xl"
            onClick={tryAdvance}
          >
            Siguiente
          </button>
        ) : (
          <button
            type="button"
            className="btn btn--primary btn--block btn--xl"
            onClick={tryAdvance}
          >
            He comido esto
          </button>
        )}
      </div>
    </div>
  );
}
