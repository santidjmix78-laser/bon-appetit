import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FeelingPicker } from '../components/FeelingPicker';
import { FodmapBadge } from '../components/FodmapBadge';
import { useApp } from '../context/AppContext';
import { getRecipeById } from '../data/recipes';
import { getFoodName, isFoodAvailable } from '../utils/helpers';
import type { Feeling } from '../types';

export function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, isFavorite, toggleFavorite, setFeeling } = useApp();
  const recipe = id ? getRecipeById(id) : undefined;
  const [showFeeling, setShowFeeling] = useState(false);

  const ingredientRows = useMemo(() => {
    if (!recipe) return [];
    return recipe.ingredients.map((ing) => ({
      ...ing,
      name: getFoodName(ing.foodId, state.customFoods),
      available: isFoodAvailable(ing.foodId, state.availableFoodIds),
    }));
  }, [recipe, state.availableFoodIds, state.customFoods]);

  if (!recipe) {
    return (
      <div className="page">
        <p>Receta no encontrada.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  const feeling = state.recipeFeelings[recipe.id];

  function onFeeling(f: Feeling) {
    setFeeling(recipe!.id, f);
    setShowFeeling(true);
  }

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <button type="button" className="back-link" onClick={() => navigate(-1)}>
          ← Atrás
        </button>
        <div className="title-row">
          <h1>{recipe.name}</h1>
          <button
            type="button"
            className={`fav-btn fav-btn--inline${isFavorite(recipe.id) ? ' fav-btn--on' : ''}`}
            onClick={() => toggleFavorite(recipe.id)}
            aria-label="Favorito"
          >
            {isFavorite(recipe.id) ? '♥' : '♡'}
          </button>
        </div>
        <div className="recipe-card__meta">
          <span>{recipe.timeMinutes} min</span>
          <span>·</span>
          <span className="capitalize">{recipe.difficulty}</span>
        </div>
      </header>

      <div
        className="recipe-hero"
        style={{
          background: `linear-gradient(145deg, hsl(${recipe.imageHue ?? 90} 40% 28%), hsl(${(recipe.imageHue ?? 90) + 40} 35% 18%))`,
        }}
      />

      <FodmapBadge level={recipe.fodmap.level} />
      {recipe.fodmap.note && (
        <p className="muted">{recipe.fodmap.note}</p>
      )}

      <section className="card">
        <h2>Ingredientes</h2>
        <ul className="ingredient-list">
          {ingredientRows.map((ing) => (
            <li key={ing.foodId + ing.quantity} className={ing.available ? '' : 'is-missing'}>
              <span>
                {ing.available ? '✓' : '○'} {ing.name}
                {ing.optional ? ' (opcional)' : ''}
              </span>
              <span className="qty">{ing.quantity}</span>
            </li>
          ))}
        </ul>
      </section>

      <Link to={`/receta/${recipe.id}/cocinar`} className="btn btn--primary btn--block btn--xl">
        Modo cocinar
      </Link>

      <section className="card">
        <FeelingPicker value={feeling} onChange={onFeeling} />
        {showFeeling && feeling && (
          <p className="ok muted">Valoración guardada. Se tendrá en cuenta junto a la orientación FODMAP.</p>
        )}
      </section>
    </div>
  );
}
