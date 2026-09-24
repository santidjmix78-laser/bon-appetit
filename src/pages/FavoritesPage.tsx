import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useApp } from '../context/AppContext';
import type { RecipeMatch } from '../types';
import { getRecipeById } from '../utils/helpers';
import { buildMatch } from '../utils/recommend';

export function FavoritesPage() {
  const { state } = useApp();

  const matches: RecipeMatch[] = state.favoriteRecipeIds
    .map((id) => getRecipeById(id, state.customRecipes))
    .filter(Boolean)
    .map((recipe) =>
      buildMatch(
        recipe!,
        state.availableFoodIds,
        state.customFoods,
        state.equipmentIds,
      ),
    );

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mis favoritos</h1>
        <p className="subtitle">Acceso rápido a las recetas que te gustan.</p>
      </header>

      <Link to="/mis-recetas" className="btn btn--ghost btn--block">
        Ir a Mis recetas →
      </Link>

      {matches.length === 0 ? (
        <div className="empty-state card">
          <p>Aún no tienes favoritos.</p>
          <p className="muted">Marca el corazón en cualquier receta para guardarla aquí.</p>
          <Link to="/recomendar?modo=recomendar" className="btn btn--primary btn--block">
            Explorar recetas
          </Link>
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
