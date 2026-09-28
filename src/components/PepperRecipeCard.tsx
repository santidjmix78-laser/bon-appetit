import { Link } from 'react-router-dom';
import type { RecipeMatch } from '../types';
import { FodmapBadge } from './FodmapBadge';
import { useApp } from '../context/AppContext';
import { equipmentLabel } from '../data/equipment';
import { displayDifficulty } from '../utils/cookAssist';
import { summarizeIngredients } from '../utils/pepperRecommend';
import type { ChefSearchMatch } from '../utils/chefSearch';

interface Props {
  match: RecipeMatch | ChefSearchMatch;
  badge?: 'liked' | 'pepper' | null;
}

function isChefSearchMatch(
  match: RecipeMatch | ChefSearchMatch,
): match is ChefSearchMatch {
  return 'avoidedFoods' in match;
}

export function PepperRecipeCard({ match, badge }: Props) {
  const {
    recipe,
    available,
    missing,
    hasAll,
    selectedMethod,
    missingEquipment,
    equipmentOk,
  } = match;
  const { isFavorite, toggleFavorite } = useApp();
  const avoidedFoods = isChefSearchMatch(match) ? match.avoidedFoods : [];

  const methodLabel =
    selectedMethod &&
    selectedMethod.id !== 'default' &&
    selectedMethod.id !== 'manual'
      ? selectedMethod.label
      : selectedMethod?.equipmentIds?.length
        ? selectedMethod.equipmentIds.map(equipmentLabel).join(' · ')
        : null;

  const missingEqLabels = (missingEquipment || []).map(equipmentLabel);

  return (
    <article className="recipe-card pepper-card recipe-card--compact">
      <div className="recipe-card__body">
        <div className="recipe-card__top">
          <div>
            {badge === 'liked' && (
              <p className="pepper-badge">❤️ Según tus gustos</p>
            )}
            {badge === 'pepper' && (
              <p className="pepper-badge pepper-badge--choice">
                ✨ Elección de Pepper
              </p>
            )}
            <h3 className="recipe-card__title">{recipe.name}</h3>
          </div>
          <button
            type="button"
            className={`fav-btn fav-btn--inline${isFavorite(recipe.id) ? ' fav-btn--on' : ''}`}
            onClick={() => toggleFavorite(recipe.id)}
            aria-label={
              isFavorite(recipe.id) ? 'Quitar de favoritos' : 'Añadir a favoritos'
            }
          >
            {isFavorite(recipe.id) ? '♥' : '♡'}
          </button>
        </div>
        <div className="recipe-card__meta">
          <span>{recipe.timeMinutes} min</span>
          <span>·</span>
          <span>{displayDifficulty(recipe.difficulty)}</span>
          {methodLabel && (
            <>
              <span>·</span>
              <span>{methodLabel}</span>
            </>
          )}
        </div>
        <p className="recipe-card__ingredients">
          {hasAll ? (
            <span className="ok">✓ Tienes todo</span>
          ) : (
            <>
              {available.length > 0 && (
                <span className="ok">
                  Ya tienes: {summarizeIngredients(available)}
                </span>
              )}
              {missing.length > 0 && (
                <span className="missing">
                  {available.length > 0 ? ' · ' : ''}
                  Te falta: {summarizeIngredients(missing, 4)}
                </span>
              )}
            </>
          )}
        </p>
        {(avoidedFoods.length > 0 ||
          (!equipmentOk && missingEqLabels.length > 0)) && (
          <div className="pepper-card__warns" role="note">
            {avoidedFoods.length > 0 && (
              <p className="pepper-card__warn">
                ⚠ Contiene un alimento que prefieres evitar:{' '}
                {avoidedFoods.join(', ')}
              </p>
            )}
            {!equipmentOk && missingEqLabels.length > 0 && (
              <p className="pepper-card__warn">
                ⚠ Requiere {missingEqLabels.join(', ')}
              </p>
            )}
          </div>
        )}
        <FodmapBadge level={recipe.fodmap.level} compact />
        <Link
          to={`/receta/${recipe.id}?from=chef`}
          className="btn btn--primary btn--block"
        >
          Ver receta
        </Link>
      </div>
    </article>
  );
}
