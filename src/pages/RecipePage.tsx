import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FeelingPicker } from '../components/FeelingPicker';
import { FodmapBadge } from '../components/FodmapBadge';
import { useApp } from '../context/AppContext';
import { equipmentLabel } from '../data/equipment';
import type { Feeling } from '../types';
import { getFoodName, getRecipeById } from '../utils/helpers';
import { isFoodAvailable, resolveRecipeSteps } from '../utils/recommend';

export function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, isFavorite, toggleFavorite, setFeeling, deleteCustomRecipe } = useApp();
  const recipe = id ? getRecipeById(id, state.customRecipes) : undefined;
  const [showFeeling, setShowFeeling] = useState(false);

  const resolved = useMemo(() => {
    if (!recipe) return null;
    return resolveRecipeSteps(recipe, state.equipmentIds);
  }, [recipe, state.equipmentIds]);

  const ingredientRows = useMemo(() => {
    if (!recipe) return [];
    return recipe.ingredients.map((ing) => ({
      ...ing,
      name: getFoodName(ing.foodId, state.customFoods),
      available: isFoodAvailable(ing.foodId, state.availableFoodIds),
    }));
  }, [recipe, state.availableFoodIds, state.customFoods]);

  if (!recipe || !resolved) {
    return (
      <div className="page">
        <p>Receta no encontrada.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  const feeling = state.recipeFeelings[recipe.id];
  const canCook = resolved.missingEquipment.length === 0;

  function onFeeling(f: Feeling) {
    setFeeling(recipe!.id, f);
    setShowFeeling(true);
  }

  function handleDelete() {
    if (!recipe?.custom) return;
    if (!window.confirm(`¿Eliminar la receta «${recipe.name}»?`)) return;
    deleteCustomRecipe(recipe.id);
    navigate('/mis-recetas');
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
          {resolved.methodLabel && (
            <>
              <span>·</span>
              <span>{resolved.methodLabel}</span>
            </>
          )}
        </div>
      </header>

      <div
        className="recipe-hero"
        style={{
          background: `linear-gradient(145deg, hsl(${recipe.imageHue ?? 90} 40% 28%), hsl(${(recipe.imageHue ?? 90) + 40} 35% 18%))`,
        }}
      />

      <FodmapBadge level={recipe.fodmap.level} />
      {recipe.fodmap.note && <p className="muted">{recipe.fodmap.note}</p>}

      {!canCook && (
        <p className="card missing">
          Necesitas:{' '}
          {resolved.missingEquipment.map(equipmentLabel).join(', ')}. Puedes ver la receta, pero
          no entrará en «Puedes hacer ahora» hasta que marques ese equipamiento en Ajustes.
        </p>
      )}

      {recipe.methods && recipe.methods.length > 1 && (
        <section className="card">
          <h2>Métodos posibles</h2>
          <ul className="method-list">
            {recipe.methods.map((method) => {
              const ok = method.equipmentIds.every((e) =>
                state.equipmentIds.includes(e),
              );
              return (
                <li key={method.id} className={ok ? 'ok' : 'muted'}>
                  {ok ? '✓' : '○'} {method.label}
                  {method.equipmentIds.length > 0 && (
                    <span className="muted">
                      {' '}
                      ({method.equipmentIds.map(equipmentLabel).join(', ')})
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
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

      {canCook ? (
        <Link to={`/receta/${recipe.id}/cocinar`} className="btn btn--primary btn--block btn--xl">
          Modo cocinar
          {resolved.methodLabel ? ` · ${resolved.methodLabel}` : ''}
        </Link>
      ) : (
        <button type="button" className="btn btn--ghost btn--block btn--xl" disabled>
          Falta equipamiento
        </button>
      )}

      {recipe.custom && (
        <div className="custom-recipe-actions">
          <Link to={`/mis-recetas/editar/${recipe.id}`} className="btn btn--ghost btn--block">
            Editar receta
          </Link>
          <button type="button" className="btn btn--danger btn--block" onClick={handleDelete}>
            Eliminar receta
          </button>
        </div>
      )}

      <section className="card">
        <FeelingPicker value={feeling} onChange={onFeeling} />
        {showFeeling && feeling && (
          <p className="ok muted">
            Valoración guardada. Se tendrá en cuenta junto a la orientación FODMAP.
          </p>
        )}
      </section>
    </div>
  );
}
