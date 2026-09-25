import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME, APP_VERSION } from '../config/app';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_CATALOG } from '../data/equipment';
import {
  ACCENT_OPTIONS,
  THEME_OPTIONS,
} from '../utils/appearance';
import {
  COOKING_LEVEL_OPTIONS,
  getAllFoods,
  getFoodName,
  normalizeSearch,
} from '../utils/helpers';
import type { AccentColor, CookingLevel, FoodItem, ThemePreference } from '../types';

export function SettingsPage() {
  const {
    state,
    clearAllData,
    setAppearance,
    toggleEquipment,
    addLikedFood,
    removeLikedFood,
    addAvoidedFood,
    removeAvoidedFood,
    setDefaultServings,
    setCookingLevel,
  } = useApp();

  const foods = useMemo(
    () => getAllFoods(state.customFoods, state.hiddenFoodIds),
    [state.customFoods, state.hiddenFoodIds],
  );

  function handleReset() {
    if (
      window.confirm(
        '¿Borrar todos los datos locales (cocina, historial, favoritos y valoraciones)? Esta acción no se puede deshacer.',
      )
    ) {
      clearAllData();
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Ajustes</h1>
        <p className="subtitle">{APP_NAME}</p>
      </header>

      <section className="card">
        <h2>Preferencias alimentarias</h2>
        <p className="muted small">
          Independientes de Mi cocina. «Me gusta» prioriza; «Prefiero evitar» excluye de
          recomendaciones automáticas. No marcan disponibilidad.
        </p>

        <PreferenceList
          title="❤️ Me gusta especialmente"
          foodIds={state.foodPreferences.likedFoodIds}
          foods={foods}
          customFoods={state.customFoods}
          onAdd={addLikedFood}
          onRemove={removeLikedFood}
          excludeIds={[
            ...state.foodPreferences.likedFoodIds,
            ...state.foodPreferences.avoidedFoodIds,
          ]}
        />

        <PreferenceList
          title="🚫 Prefiero evitar"
          foodIds={state.foodPreferences.avoidedFoodIds}
          foods={foods}
          customFoods={state.customFoods}
          onAdd={addAvoidedFood}
          onRemove={removeAvoidedFood}
          excludeIds={[
            ...state.foodPreferences.likedFoodIds,
            ...state.foodPreferences.avoidedFoodIds,
          ]}
        />
      </section>

      <section className="card">
        <h2>Comensales habituales</h2>
        <p className="muted small">Número de personas para las que sueles cocinar.</p>
        <div className="stepper">
          <button
            type="button"
            className="btn btn--ghost btn--sm stepper__btn"
            onClick={() => setDefaultServings(state.defaultServings - 1)}
            disabled={state.defaultServings <= 1}
            aria-label="Menos comensales"
          >
            −
          </button>
          <span className="stepper__value" aria-live="polite">
            {state.defaultServings}
          </span>
          <button
            type="button"
            className="btn btn--ghost btn--sm stepper__btn"
            onClick={() => setDefaultServings(state.defaultServings + 1)}
            disabled={state.defaultServings >= 20}
            aria-label="Más comensales"
          >
            +
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Nivel de cocina</h2>
        <p className="muted small">
          Define cuánto detalle necesitas en las instrucciones. No filtra recetas por dificultad.
        </p>
        <div className="theme-row">
          {COOKING_LEVEL_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`chip${state.cookingLevel === opt.id ? ' chip--selected' : ''}`}
              onClick={() => setCookingLevel(opt.id as CookingLevel)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Apariencia</h2>
        <p className="field-label">Tema</p>
        <div className="theme-row">
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`chip${state.appearance.theme === t.id ? ' chip--selected' : ''}`}
              onClick={() => setAppearance({ theme: t.id as ThemePreference })}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="field-label">Color de acento</p>
        <div className="accent-row">
          {ACCENT_OPTIONS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={`accent-swatch${state.appearance.accent === a.id ? ' accent-swatch--active' : ''}`}
              style={{ '--swatch': a.hex } as CSSProperties}
              onClick={() => setAppearance({ accent: a.id as AccentColor })}
              aria-label={a.label}
              title={a.label}
            />
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Equipamiento de cocina</h2>
        <p className="muted">
          Marca lo que tienes. Las recetas se adaptarán a estos métodos cuando sea posible.
        </p>
        <div className="equipment-grid">
          {EQUIPMENT_CATALOG.map((eq) => {
            const on = state.equipmentIds.includes(eq.id);
            return (
              <button
                key={eq.id}
                type="button"
                className={`chip chip--lg${on ? ' chip--selected' : ''}`}
                onClick={() => toggleEquipment(eq.id)}
                aria-pressed={on}
              >
                {on ? '☑' : '☐'} {eq.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card">
        <h2>Mis recetas</h2>
        <p className="muted">Crea, edita y usa tus propias recetas en las recomendaciones.</p>
        <Link to="/mis-recetas" className="btn btn--primary btn--block">
          Abrir Mis recetas
        </Link>
      </section>

      <section className="card">
        <h2>Almacenamiento</h2>
        <p className="muted">
          Tus datos se guardan solo en este dispositivo (localStorage). No hay cuentas ni servidor.
        </p>
        <ul className="stats-list">
          <li>Alimentos disponibles: {state.availableFoodIds.length}</li>
          <li>Personalizados: {state.customFoods.length}</li>
          <li>Recetas propias: {state.customRecipes.length}</li>
          <li>Registros de comidas: {state.mealEntries.length}</li>
          <li>Favoritos: {state.favoriteRecipeIds.length}</li>
        </ul>
        <button type="button" className="btn btn--danger btn--block" onClick={handleReset}>
          Restablecer datos
        </button>
      </section>

      <section className="card">
        <h2>Sobre FODMAP</h2>
        <p className="muted">
          La orientación FODMAP es informativa y de demostración. No diagnostica ni prohíbe alimentos.
          Tu valoración personal («¿Cómo te ha sentado?») convive con ella.
        </p>
      </section>

      <section className="card">
        <h2>Instalar como app</h2>
        <p className="muted">
          En el móvil, abre el menú del navegador y elige «Añadir a pantalla de inicio» o «Instalar aplicación» para usarla como PWA.
        </p>
      </section>

      <footer className="app-version">
        <p className="app-version__name">{APP_NAME}</p>
        <p className="app-version__num">Versión {APP_VERSION}</p>
      </footer>
    </div>
  );
}

function PreferenceList({
  title,
  foodIds,
  foods,
  customFoods,
  onAdd,
  onRemove,
  excludeIds,
}: {
  title: string;
  foodIds: string[];
  foods: FoodItem[];
  customFoods: FoodItem[];
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  excludeIds: string[];
}) {
  const [query, setQuery] = useState('');
  const excludeKey = excludeIds.join(',');

  const suggestions = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return [];
    const exclude = new Set(excludeIds);
    return foods
      .filter((f) => !exclude.has(f.id) && normalizeSearch(f.name).includes(q))
      .slice(0, 8);
    // excludeIds captured via excludeKey for stable identity
    // eslint-disable-next-line react-hooks/exhaustive-deps -- excludeKey tracks excludeIds
  }, [foods, query, excludeKey, excludeIds]);

  return (
    <div className="pref-block">
      <p className="field-label">{title}</p>
      <div className="chip-grid">
        {foodIds.length === 0 ? (
          <span className="muted small">Ninguno todavía</span>
        ) : (
          foodIds.map((id) => (
            <button
              key={id}
              type="button"
              className="chip chip--selected"
              onClick={() => onRemove(id)}
              title="Quitar"
            >
              {getFoodName(id, customFoods)} ×
            </button>
          ))
        )}
      </div>
      <input
        className="input"
        type="search"
        placeholder="Buscar para añadir..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className="chip-grid pref-suggestions">
          {suggestions.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              onClick={() => {
                onAdd(f.id);
                setQuery('');
              }}
            >
              + {f.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
