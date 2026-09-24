import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MealTypeSelector } from '../components/MealTypeSelector';
import { RecipeCard } from '../components/RecipeCard';
import { TimeSelector } from '../components/TimeSelector';
import { useApp } from '../context/AppContext';
import type { MealType, TimeOption } from '../types';
import { matchRecipes, mealTypeLabel } from '../utils/helpers';
import { setSelectedMealType } from '../utils/mealSession';

export function RecommendPage() {
  const [params] = useSearchParams();
  const modo = params.get('modo') ?? 'recomendar';
  const { state } = useApp();
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [time, setTime] = useState<TimeOption | null>(null);

  const titles: Record<string, string> = {
    recomendar: 'Recomiéndame qué comer',
    cena: 'Recomiéndame qué comer',
    cocinar: 'Cocinar con lo que tengo',
    planificar: 'Planificar',
  };

  function selectMealType(v: MealType) {
    setMealType(v);
    setTime(null);
    setSelectedMealType(v);
  }

  const matches = useMemo(() => {
    if (time === null || mealType === null) return [];
    return matchRecipes(state.availableFoodIds, state.customFoods, time, mealType);
  }, [time, mealType, state.availableFoodIds, state.customFoods]);

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        <h1>{titles[modo] ?? '¿Qué puedo comer?'}</h1>
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

      {time !== null && mealType !== null && (
        <section className="results">
          <h2>
            {matches.length > 0
              ? `${matches.length} propuestas · ${mealTypeLabel(mealType)}`
              : 'Sin propuestas'}
          </h2>
          {matches.length === 0 ? (
            <p className="empty-hint">
              Prueba con más tiempo, otro tipo de comida o marca más alimentos en Mi cocina.
            </p>
          ) : (
            <div className="recipe-list">
              {matches.map((m) => (
                <RecipeCard key={m.recipe.id} match={m} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

