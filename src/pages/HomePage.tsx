import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { greeting, MEAL_TYPE_OPTIONS, mealTypeLabel } from '../utils/helpers';
import type { MealType } from '../types';

export function HomePage() {
  const navigate = useNavigate();
  const { todayMeals, addMealEntry } = useApp();
  const [showRegister, setShowRegister] = useState(false);
  const [todayText, setTodayText] = useState('');
  const [mealType, setMealType] = useState<MealType>('comida');

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
          onClick={() => navigate('/recomendar?modo=cocinar')}
        >
          <span className="action-card__title">Cocinar con lo que tengo</span>
          <span className="action-card__desc">
            Recetas con tus alimentos disponibles ahora
          </span>
        </button>

        <button
          type="button"
          className="action-card"
          onClick={() => navigate('/modo-chef')}
        >
          <span className="action-card__title">Modo Chef</span>
          <span className="action-card__desc">Descubre platos y cocina paso a paso</span>
        </button>

        <button
          type="button"
          className="action-card"
          onClick={() => navigate('/recomendar?modo=planificar')}
        >
          <span className="action-card__title">Planificar</span>
          <span className="action-card__desc">Elige tipo, tiempo y mira opciones</span>
        </button>

        <button
          type="button"
          className="action-card action-card--secondary"
          onClick={() => setShowRegister(true)}
        >
          <span className="action-card__title">+ Registrar lo que he comido</span>
          <span className="action-card__desc">Anota desayuno, comida, merienda o cena</span>
        </button>
      </section>

      <div className="quick-links">
        <Link to="/cocina" className="text-link">
          Mi cocina →
        </Link>
        <Link to="/mis-recetas" className="text-link">
          Mis recetas →
        </Link>
        <Link to="/semana" className="text-link">
          Mi semana →
        </Link>
      </div>

      {showRegister && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="register-q">
          <div className="modal">
            <h2 id="register-q">Registrar lo que he comido</h2>
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
              <button
                type="button"
                className="btn btn--primary btn--block"
                onClick={() => {
                  if (!todayText.trim()) return;
                  addMealEntry({ text: todayText, mealType });
                  setTodayText('');
                  setShowRegister(false);
                }}
                disabled={!todayText.trim()}
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
