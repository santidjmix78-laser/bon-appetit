import { Link } from 'react-router-dom';
import type { RecipeMatch } from '../types';
import { FodmapBadge } from './FodmapBadge';
import { useApp } from '../context/AppContext';

interface Props {
  match: RecipeMatch;
}

export function RecipeCard({ match }: Props) {
  const { recipe, missing, hasAll } = match;
  const { isFavorite, toggleFavorite, state } = useApp();
  const feeling = state.recipeFeelings[recipe.id];

  return (
    <article className="recipe-card">
      <div
        className="recipe-card__photo"
        style={{
          background: `linear-gradient(145deg, hsl(${recipe.imageHue ?? 90} 40% 28%), hsl(${(recipe.imageHue ?? 90) + 40} 35% 18%))`,
        }}
        aria-hidden
      >
        <span className="recipe-card__photo-label">{recipe.name.charAt(0)}</span>
        <button
          type="button"
          className={`fav-btn${isFavorite(recipe.id) ? ' fav-btn--on' : ''}`}
          onClick={() => toggleFavorite(recipe.id)}
          aria-label={isFavorite(recipe.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite(recipe.id) ? '♥' : '♡'}
        </button>
      </div>
      <div className="recipe-card__body">
        <h3 className="recipe-card__title">{recipe.name}</h3>
        <div className="recipe-card__meta">
          <span>{recipe.timeMinutes} min</span>
          <span>·</span>
          <span className="capitalize">{recipe.difficulty}</span>
          {feeling && (
            <>
              <span>·</span>
              <span title="Cómo te sentó">
                {feeling === 'good' ? '👍' : feeling === 'ok' ? '😐' : '👎'}
              </span>
            </>
          )}
        </div>
        <p className="recipe-card__ingredients">
          {hasAll ? (
            <span className="ok">✓ Tienes todo</span>
          ) : (
            <span className="missing">Te falta: {missing.join(', ')}</span>
          )}
        </p>
        <FodmapBadge level={recipe.fodmap.level} compact />
        <Link to={`/receta/${recipe.id}`} className="btn btn--primary btn--block">
          Ver receta
        </Link>
      </div>
    </article>
  );
}
