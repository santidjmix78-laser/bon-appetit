import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FeelingPicker } from '../components/FeelingPicker';
import { useApp } from '../context/AppContext';
import { getRecipeById } from '../data/recipes';
import { getFoodName } from '../utils/helpers';
import type { Feeling } from '../types';

export function CookModePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, addMealEntry, setFeeling } = useApp();
  const recipe = id ? getRecipeById(id) : undefined;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [entryId, setEntryId] = useState<string | null>(null);

  if (!recipe) {
    return (
      <div className="page">
        <p>Receta no encontrada.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  const total = recipe.steps.length;
  const isLast = step >= total - 1;

  function finish() {
    const mains = recipe!.ingredients
      .filter((i) => !i.optional)
      .slice(0, 4)
      .map((i) => getFoodName(i.foodId, state.customFoods));

    const entry = addMealEntry({
      text: recipe!.name,
      mealType: 'cena',
      recipeId: recipe!.id,
      mainIngredients: mains,
    });
    setEntryId(entry.id);
    setDone(true);
  }

  function onFeeling(f: Feeling) {
    setFeeling(recipe!.id, f, entryId ?? undefined);
  }

  if (done) {
    return (
      <div className="page page--cook done-screen">
        <h1>¡Listo!</h1>
        <p className="subtitle">Has registrado: {recipe.name}</p>
        <FeelingPicker
          value={state.recipeFeelings[recipe.id]}
          onChange={onFeeling}
        />
        <button type="button" className="btn btn--primary btn--block btn--xl" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
        <Link to="/semana" className="text-link center">
          Ver mi semana →
        </Link>
      </div>
    );
  }

  return (
    <div className="page page--cook">
      <header className="cook-header">
        <button type="button" className="back-link" onClick={() => navigate(`/receta/${recipe.id}`)}>
          ← Salir
        </button>
        <p className="cook-progress">
          Paso {step + 1} de {total}
        </p>
        <div className="progress-bar" aria-hidden>
          <div className="progress-bar__fill" style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
        <h1 className="cook-title">{recipe.name}</h1>
      </header>

      <div className="cook-step card">
        <p className="cook-step__text">{recipe.steps[step]}</p>
      </div>

      <div className="cook-actions">
        {step > 0 && (
          <button type="button" className="btn btn--ghost btn--block" onClick={() => setStep((s) => s - 1)}>
            Anterior
          </button>
        )}
        {!isLast ? (
          <button type="button" className="btn btn--primary btn--block btn--xl" onClick={() => setStep((s) => s + 1)}>
            Siguiente
          </button>
        ) : (
          <button type="button" className="btn btn--primary btn--block btn--xl" onClick={finish}>
            He comido esto
          </button>
        )}
      </div>
    </div>
  );
}
