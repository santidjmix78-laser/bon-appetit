import type { CSSProperties } from 'react';
import { APP_NAME, APP_VERSION } from '../config/app';
import { useApp } from '../context/AppContext';
import {
  ACCENT_OPTIONS,
  THEME_OPTIONS,
} from '../utils/appearance';
import type { AccentColor, ThemePreference } from '../types';

export function SettingsPage() {
  const { state, clearAllData, setAppearance } = useApp();

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
        <h2>Almacenamiento</h2>
        <p className="muted">
          Tus datos se guardan solo en este dispositivo (localStorage). No hay cuentas ni servidor.
        </p>
        <ul className="stats-list">
          <li>Alimentos disponibles: {state.availableFoodIds.length}</li>
          <li>Personalizados: {state.customFoods.length}</li>
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
