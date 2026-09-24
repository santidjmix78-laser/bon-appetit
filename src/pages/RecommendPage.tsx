import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { TimeSelector } from '../components/TimeSelector';
import { useApp } from '../context/AppContext';
import type { TimeOption } from '../types';
import { matchRecipes } from '../utils/helpers';

export function RecommendPage() {
  const [params] = useSearchParams();
  const modo = params.get('modo') ?? 'cena';
  const { state } = useApp();
  const [time, setTime] = useState<TimeOption | null>(null);

  const titles: Record<string, string> = {
    cena: 'Recomiéndame una cena',
    cocinar: 'Cocinar con lo que tengo',
    planificar: 'Planificar',
  };

  const matches = useMemo(() => {
    if (time === null) return [];
    return matchRecipes(state.availableFoodIds, state.customFoods, time);
  }, [time, state.availableFoodIds, state.customFoods]);

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        <h1>{titles[modo] ?? '¿Qué puedo comer?'}</h1>
      </header>

      <section className="card">
        <h2 className="section-q">¿Cuánto tiempo quieres dedicar?</h2>
        <TimeSelector value={time} onChange={setTime} />
      </section>

      {time !== null && (
        <section className="results">
          <h2>
            {matches.length > 0
              ? `${matches.length} propuestas`
              : 'Sin propuestas'}
          </h2>
          {matches.length === 0 ? (
            <p className="empty-hint">
              Prueba con más tiempo o marca más alimentos en Mi cocina.
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
