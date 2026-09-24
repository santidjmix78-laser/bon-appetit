import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { greeting, MEAL_TYPE_OPTIONS, mealTypeLabel } from '../utils/helpers';
import type { MealType } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { todayMeals, addMealEntry } = useApp();
  const [showTodayPrompt, setShowTodayPrompt] = useState(false);
  const [todayText, setTodayText] = useState('');
  const [mealType, setMealType] = useState<MealType>('comida');
  const [pendingAction, setPendingAction] = useState<'recomendar' | 'planificar' | null>(null);

  const hasLoggedToday = todayMeals.length > 0;
  const isWeekday = (() => {
    const d = new Date().getDay();
    return d >= 1 && d <= 5;
  })();

  function startRecommend(mode: 'recomendar' | 'cocinar' | 'planificar') {
    if (mode === 'recomendar' && isWeekday && !hasLoggedToday) {
      setPendingAction('recomendar');
      setShowTodayPrompt(true);
      return;
    }
    if (mode === 'planificar' && isWeekday && !hasLoggedToday) {
      setPendingAction('planificar');
      setShowTodayPrompt(true);
      return;
    }
    navigate(`/recomendar?modo=${mode}`);
  }

  function saveTodayAndContinue() {
    if (todayText.trim()) {
      addMealEntry({ text: todayText, mealType });
    }
    setShowTodayPrompt(false);
    setTodayText('');
    const modo = pendingAction === 'planificar' ? 'planificar' : 'recomendar';
    setPendingAction(null);
    navigate(`/recomendar?modo=${modo}`);
  }

  function skipAndContinue() {
    setShowTodayPrompt(false);
    const modo = pendingAction === 'planificar' ? 'planificar' : 'recomendar';
    setPendingAction(null);
    navigate(`/recomendar?modo=${modo}`);
  }

  return (
    <div className="page page--home">
      <header className="page-header">
        <p className="eyebrow">Bon Appetit</p>
        <h1>{greeting()}</h1>
        <p className="subtitle">¿Qué te apetece cocinar hoy?</p>
      </header>

      {todayMeals.length > 0 && (
        <section className="card today-summary">
          <h2>Hoy has registrado</h2>
          <ul>
            {todayMeals.map((m) => (
              <li key={m.id}>
                <strong>{mealTypeLabel(m.mealType)}:</strong> {m.text}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="action-grid">
        <button
          type="button"
          className="action-card action-card--primary"
          onClick={() => startRecommend('recomendar')}
        >
          <span className="action-card__title">Recomiéndame qué comer</span>
          <span className="action-card__desc">Según lo que tienes y el tiempo</span>
        </button>
        <button type="button" className="action-card" onClick={() => startRecommend('cocinar')}>
          <span className="action-card__title">Cocinar con lo que tengo</span>
          <span className="action-card__desc">Cruza tu cocina con recetas</span>
        </button>
        <button type="button" className="action-card" onClick={() => startRecommend('planificar')}>
          <span className="action-card__title">Planificar</span>
          <span className="action-card__desc">Elige tipo, tiempo y mira opciones</span>
        </button>
        <button
          type="button"
          className="action-card"
          onClick={() => {
            setPendingAction(null);
            setShowTodayPrompt(true);
          }}
        >
          <span className="action-card__title">Registrar lo que he comido</span>
          <span className="action-card__desc">Desayuno, comida, merienda o cena</span>
        </button>
      </section>

      <div className="quick-links">
        <Link to="/cocina" className="text-link">
          Ir a Mi cocina →
        </Link>
        <Link to="/semana" className="text-link">
          Ver mi semana →
        </Link>
      </div>

      {showTodayPrompt && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="today-q">
          <div className="modal">
            <h2 id="today-q">¿Qué has comido hoy?</h2>
            <p className="modal__hint">
              Escribe libremente, por ejemplo: «Bocadillo de pavo y queso y una Coca-Cola»
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
              placeholder="Describe lo que has comido..."
              value={todayText}
              onChange={(e) => setTodayText(e.target.value)}
              autoFocus
            />
            <div className="modal__actions">
              {pendingAction ? (
                <>
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={saveTodayAndContinue}
                    disabled={!todayText.trim()}
                  >
                    Guardar y continuar
                  </button>
                  <button type="button" className="btn btn--ghost btn--block" onClick={skipAndContinue}>
                    Continuar sin registrar
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn--primary btn--block"
                    onClick={() => {
                      if (!todayText.trim()) return;
                      addMealEntry({ text: todayText, mealType });
                      setTodayText('');
                      setShowTodayPrompt(false);
                    }}
                    disabled={!todayText.trim()}
                  >
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--block"
                    onClick={() => setShowTodayPrompt(false)}
                  >
                    Cancelar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
