import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { MealType } from '../types';
import {
  getCurrentWeekDates,
  isWeekend,
  mealTypeLabel,
  WEEKDAY_LABELS,
} from '../utils/helpers';

const ALL_MEALS: MealType[] = ['desayuno', 'comida', 'merienda', 'cena'];

export function WeekPage() {
  const { state } = useApp();
  const dates = useMemo(() => getCurrentWeekDates(), []);

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mi semana</h1>
        <p className="subtitle">
          Historial de lo que has registrado: desayuno, comida, merienda y cena.
        </p>
      </header>

      <div className="week-list">
        {dates.map((date, idx) => {
          const weekend = isWeekend(date);
          const entries = state.mealEntries.filter((e) => e.date === date);

          return (
            <section key={date} className="card week-day">
              <h2>
                {WEEKDAY_LABELS[idx]}
                <span className="week-day__date">{formatDate(date)}</span>
              </h2>
              <ul className="week-meals">
                {ALL_MEALS.map((meal) => {
                  const found = entries.filter((e) => e.mealType === meal);
                  return (
                    <li key={meal}>
                      <span className="meal-label">{mealTypeLabel(meal)}</span>
                      {found.length === 0 ? (
                        <span className="meal-empty">
                          {meal === 'comida' && !weekend
                            ? 'Sin registrar (a menudo fuera / trabajo)'
                            : 'Sin registrar'}
                        </span>
                      ) : (
                        <span className="meal-value">
                          {found.map((e) => e.text).join(' · ')}
                          {found.some((e) => e.feeling) && (
                            <span className="feeling-inline">
                              {' '}
                              {found
                                .filter((e) => e.feeling)
                                .map((e) =>
                                  e.feeling === 'good'
                                    ? '👍'
                                    : e.feeling === 'ok'
                                      ? '😐'
                                      : '👎',
                                )
                                .join('')}
                            </span>
                          )}
                          {found[0]?.recipeId && (
                            <>
                              {' '}
                              <Link to={`/receta/${found[0].recipeId}`} className="text-link">
                                ver
                              </Link>
                            </>
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <p className="muted small">
        Más adelante podremos usar esta estructura para sugerir variedad y frecuencia. Por ahora no hay análisis nutricional.
      </p>
    </div>
  );
}

function formatDate(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}
