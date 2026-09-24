import { useApp } from '../context/AppContext';

export function SettingsPage() {
  const { state, clearAllData } = useApp();

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
        <p className="subtitle">Bon Appetit · Versión 1</p>
      </header>

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
    </div>
  );
}
