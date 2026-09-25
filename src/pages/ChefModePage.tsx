import { Link } from 'react-router-dom';

/**
 * Entrada preparada para Modo Chef (próxima versión).
 * No reutiliza el motor de recomendaciones actual.
 */
export function ChefModePage() {
  return (
    <div className="page page--chef">
      <header className="page-header page-header--with-back">
        <Link to="/" className="back-link">
          ← Inicio
        </Link>
        <h1>Modo Chef</h1>
        <p className="subtitle">Descubre platos y cocina paso a paso</p>
      </header>

      <section className="card chef-coming">
        <p className="chef-coming__eyebrow">Próximamente</p>
        <h2>Modo Chef estará disponible próximamente.</h2>
        <p className="muted">
          Estamos preparando una experiencia guiada para descubrir ideas y cocinar
          con más detalle. Mientras tanto, puedes usar «Cocinar con lo que tengo»
          o «Planificar».
        </p>
        <Link to="/recomendar?modo=cocinar" className="btn btn--primary btn--block">
          Cocinar con lo que tengo
        </Link>
        <Link to="/" className="btn btn--ghost btn--block">
          Volver al inicio
        </Link>
      </section>
    </div>
  );
}
