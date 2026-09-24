import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useApp } from '../context/AppContext';
import { buildMatch } from '../utils/recommend';

export function MyRecipesPage() {
  const { state } = useApp();

  const matches = state.customRecipes.map((recipe) =>
    buildMatch(recipe, state.availableFoodIds, state.customFoods, state.equipmentIds),
  );

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <Link to="/favoritos" className="back-link">
          ← Favoritos
        </Link>
        <h1>Mis recetas</h1>
        <p className="subtitle">
          Crea tus propias recetas. Participan en las recomendaciones igual que las de Bon Appetit.
        </p>
      </header>

      <Link to="/mis-recetas/nueva" className="btn btn--primary btn--block">
        + Crear receta
      </Link>

      {matches.length === 0 ? (
        <div className="empty-state card">
          <p>Todavía no has creado ninguna receta.</p>
          <p className="muted">Empieza con un plato sencillo que suelas hacer en casa.</p>
        </div>
      ) : (
        <div className="recipe-list" style={{ marginTop: '1rem' }}>
          {matches.map((m) => (
            <RecipeCard key={m.recipe.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
}
