import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import type { MealType } from '../types';
import {
  ALL_MEAL_TYPES,
  getCurrentWeekDates,
  isWeekend,
  mealTypeLabel,
  MEAL_TYPE_OPTIONS,
  todayISO,
  WEEKDAY_LABELS,
} from '../utils/helpers';

function formatDate(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

function isFutureDate(iso: string): boolean {
  return iso > todayISO();
}

export function WeekPage() {
  const { state, addMealEntry } = useApp();
  const dates = useMemo(() => getCurrentWeekDates(), []);
  const [selectedDate, setSelectedDate] = useState(() => todayISO());
  const [showRegister, setShowRegister] = useState(false);
  const [text, setText] = useState('');
  const [mealType, setMealType] = useState<MealType>('comida');

  const selectedIsFuture = isFutureDate(selectedDate);
  const selectedLabel =
    WEEKDAY_LABELS[dates.indexOf(selectedDate)] || selectedDate;

  function openRegister(date: string) {
    if (isFutureDate(date)) return;
    setSelectedDate(date);
    setShowRegister(true);
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mi semana</h1>
        <p className="subtitle">
          Toca un día para ver o registrar lo que comiste (también días
          anteriores).
        </p>
      </header>

      <div className="week-date-nav" role="tablist" aria-label="Días de la semana">
        {dates.map((date, idx) => {
          const future = isFutureDate(date);
          const active = date === selectedDate;
          const count = state.mealEntries.filter((e) => e.date === date).length;
          return (
            <button
              key={date}
              type="button"
              role="tab"
              aria-selected={active}
              className={`week-date-chip${active ? ' is-active' : ''}${future ? ' is-future' : ''}`}
              disabled={future}
              onClick={() => setSelectedDate(date)}
              title={future ? 'No se pueden registrar comidas futuras' : undefined}
            >
              <span className="week-date-chip__day">{WEEKDAY_LABELS[idx]?.slice(0, 3)}</span>
              <span className="week-date-chip__num">{formatDate(date)}</span>
              {count > 0 && <span className="week-date-chip__dot" aria-hidden />}
            </button>
          );
        })}
      </div>

      <section className="card week-day">
        <h2>
          {selectedLabel}
          <span className="week-day__date">{formatDate(selectedDate)}</span>
          {selectedDate === todayISO() && (
            <span className="week-day__today"> · Hoy</span>
          )}
        </h2>

        {!selectedIsFuture && (
          <button
            type="button"
            className="btn btn--primary btn--block"
            onClick={() => openRegister(selectedDate)}
          >
            + Registrar comida de este día
          </button>
        )}

        <ul className="week-meals">
          {ALL_MEAL_TYPES.map((meal) => {
            const found = state.mealEntries.filter(
              (e) => e.date === selectedDate && e.mealType === meal,
            );
            const weekend = isWeekend(selectedDate);
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
                        <Link
                          to={`/receta/${found[0].recipeId}`}
                          className="text-link"
                        >
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

      <div className="week-list week-list--compact">
        {dates
          .filter((d) => d !== selectedDate && !isFutureDate(d))
          .map((date) => {
            const idx = dates.indexOf(date);
            const entries = state.mealEntries.filter((e) => e.date === date);
            if (entries.length === 0) return null;
            return (
              <button
                key={date}
                type="button"
                className="card week-day week-day--summary"
                onClick={() => setSelectedDate(date)}
              >
                <strong>
                  {WEEKDAY_LABELS[idx]} {formatDate(date)}
                </strong>
                <span className="muted small">
                  {entries.length} registro{entries.length === 1 ? '' : 's'}
                </span>
              </button>
            );
          })}
      </div>

      <p className="muted small">
        Más adelante podremos usar esta estructura para sugerir variedad y
        frecuencia. Por ahora no hay análisis nutricional.
      </p>

      {showRegister && !selectedIsFuture && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="week-register-q"
        >
          <div className="modal">
            <h2 id="week-register-q">
              Registrar · {selectedLabel} {formatDate(selectedDate)}
            </h2>
            <p className="modal__hint">
              Escribe libremente, por ejemplo: «Ensalada de atún y yogur»
            </p>
            <div className="meal-type-row">
              {MEAL_TYPE_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`chip${mealType === t.id ? ' chip--selected' : ''}`}
                  onClick={() => setMealType(t.id)}
                >
                  {t.emoji} {t.label}
                </button>
              ))}
            </div>
            <textarea
              className="input textarea"
              rows={3}
              placeholder="Describe lo que comiste..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              autoFocus
            />
            <div className="modal__actions">
              <button
                type="button"
                className="btn btn--primary btn--block"
                disabled={!text.trim()}
                onClick={() => {
                  if (!text.trim()) return;
                  addMealEntry({
                    text,
                    mealType,
                    date: selectedDate,
                  });
                  setText('');
                  setShowRegister(false);
                }}
              >
                Guardar
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--block"
                onClick={() => setShowRegister(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
