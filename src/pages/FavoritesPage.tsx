import { Link } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard';
import { useApp } from '../context/AppContext';
import { getRecipeById } from '../data/recipes';
import type { RecipeMatch } from '../types';
import { getFoodName, isFoodAvailable } from '../utils/helpers';

export function FavoritesPage() {
  const { state } = useApp();

  const matches: RecipeMatch[] = state.favoriteRecipeIds
    .map((id) => getRecipeById(id))
    .filter(Boolean)
    .map((recipe) => {
      const r = recipe!;
      const required = r.ingredients.filter((i) => !i.optional);
      const available: string[] = [];
      const missing: string[] = [];
      for (const ing of required) {
        const name = getFoodName(ing.foodId, state.customFoods);
        if (isFoodAvailable(ing.foodId, state.availableFoodIds)) available.push(name);
        else missing.push(name);
      }
      return { recipe: r, available, missing, hasAll: missing.length === 0 };
    });

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mis favoritos</h1>
        <p className="subtitle">Acceso rápido a las recetas que te gustan.</p>
      </header>

      {matches.length === 0 ? (
        <div className="empty-state card">
          <p>Aún no tienes favoritos.</p>
          <p className="muted">Marca el corazón en cualquier receta para guardarla aquí.</p>
          <Link to="/recomendar?modo=recomendar" className="btn btn--primary btn--block">
            Explorar recetas
          </Link>
        </div>
      ) : (
        <div className="recipe-list">
          {matches.map((m) => (
            <RecipeCard key={m.recipe.id} match={m} />
          ))}
        </div>
      )}
    </div>
  );
}
