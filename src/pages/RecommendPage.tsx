import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MealTypeSelector } from '../components/MealTypeSelector';
import { RecipeCard } from '../components/RecipeCard';
import { TimeSelector } from '../components/TimeSelector';
import { useApp } from '../context/AppContext';
import type { MealType, TimeOption } from '../types';
import { getAllRecipes, mealTypeLabel } from '../utils/helpers';
import { setSelectedMealType } from '../utils/mealSession';
import { recommendRecipes } from '../utils/recommend';

export function RecommendPage() {
  const [params] = useSearchParams();
  const modo = params.get('modo') ?? 'recomendar';
  const isStrict = modo === 'cocinar';
  const { state } = useApp();
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [time, setTime] = useState<TimeOption | null>(null);

  const titles: Record<string, string> = {
    cocinar: 'Cocinar con lo que tengo',
    planificar: 'Planificar',
    recomendar: 'Planificar',
    cena: 'Cocinar con lo que tengo',
  };

  function selectMealType(v: MealType) {
    setMealType(v);
    setTime(null);
    setSelectedMealType(v);
  }

  const result = useMemo(() => {
    if (time === null || mealType === null) return null;
    return recommendRecipes({
      recipes: getAllRecipes(state.customRecipes),
      availableFoodIds: state.availableFoodIds,
      customFoods: state.customFoods,
      equipmentIds: state.equipmentIds,
      maxMinutes: time,
      mealType,
      mode: isStrict ? 'strict' : 'flexible',
      likedFoodIds: state.foodPreferences.likedFoodIds,
      avoidedFoodIds: state.foodPreferences.avoidedFoodIds,
      preferenceLabels: state.foodPreferences.labels ?? {},
    });
  }, [
    time,
    mealType,
    state.availableFoodIds,
    state.customFoods,
    state.customRecipes,
    state.equipmentIds,
    state.foodPreferences.likedFoodIds,
    state.foodPreferences.avoidedFoodIds,
    state.foodPreferences.labels,
    isStrict,
  ]);

  const total =
    result ? result.ready.length + result.needOne.length + result.needTwo.length : 0;

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        <h1>{titles[modo] ?? '¿Qué puedo comer?'}</h1>
        {isStrict && (
          <p className="subtitle">
            Solo con los alimentos que tienes marcados como disponibles ahora.
          </p>
        )}
      </header>

      <section className="card">
        <MealTypeSelector value={mealType} onChange={selectMealType} />
      </section>

      {mealType !== null && (
        <section className="card">
          <h2 className="section-q">¿Cuánto tiempo quieres dedicar?</h2>
          <TimeSelector value={time} onChange={setTime} />
        </section>
      )}

      {result && (
        <section className="results">
          {total === 0 ? (
            <div className="empty-state card">
              <p>No encuentro una receta completa con lo que tienes ahora.</p>
              <p className="muted">
                Prueba a añadir más alimentos disponibles en Mi cocina o a marcar otro tipo de
                comida / tiempo.
              </p>
              <Link to="/cocina" className="btn btn--primary btn--block">
                Ir a Mi cocina
              </Link>
            </div>
          ) : (
            <>
              {result.ready.length > 0 && (
                <div className="result-group">
                  <h2>Puedes hacer ahora · {mealTypeLabel(mealType!)}</h2>
                  <div className="recipe-list">
                    {result.ready.map((m) => (
                      <RecipeCard key={m.recipe.id} match={m} />
                    ))}
                  </div>
                </div>
              )}

              {result.ready.length === 0 && (
                <p className="empty-hint card">
                  No encuentro una receta completa con lo que tienes ahora.
                </p>
              )}

              {result.needOne.length > 0 && (
                <div className="result-group">
                  <h2>Con 1 ingrediente más</h2>
                  <div className="recipe-list">
                    {result.needOne.map((m) => (
                      <RecipeCard key={m.recipe.id} match={m} />
                    ))}
                  </div>
                </div>
              )}

              {result.needTwo.length > 0 && (
                <div className="result-group">
                  <h2>Con 2 ingredientes más</h2>
                  <div className="recipe-list">
                    {result.needTwo.map((m) => (
                      <RecipeCard key={m.recipe.id} match={m} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
