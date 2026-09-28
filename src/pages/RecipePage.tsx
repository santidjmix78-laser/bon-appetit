import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FodmapBadge } from '../components/FodmapBadge';
import { useApp } from '../context/AppContext';
import { equipmentLabel } from '../data/equipment';
import { displayDifficulty } from '../utils/cookAssist';
import { getFoodName, getRecipeById } from '../utils/helpers';
import {
  compatibleMethods,
  formatScaledQuantity,
  scaleAmount,
} from '../utils/recipeModel';
import { isFoodAvailable, pickCookingMethod } from '../utils/recommend';

export function RecipePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const fromChef = searchParams.get('from') === 'chef';
  const navigate = useNavigate();
  const { state, isFavorite, toggleFavorite, deleteCustomRecipe } = useApp();
  const recipe = id ? getRecipeById(id, state.customRecipes) : undefined;
  const [servings, setServings] = useState(() =>
    Math.max(1, state.defaultServings || 1),
  );

  const methodsOk = useMemo(() => {
    if (!recipe) return [];
    return compatibleMethods(recipe, state.equipmentIds);
  }, [recipe, state.equipmentIds]);

  const [methodId, setMethodId] = useState<string | null>(null);

  const selectedMethod = useMemo(() => {
    if (!recipe) return null;
    if (methodId) {
      return methodsOk.find((m) => m.id === methodId) ?? methodsOk[0] ?? null;
    }
    return (
      pickCookingMethod(recipe, state.equipmentIds).method ??
      methodsOk[0] ??
      null
    );
  }, [recipe, methodId, methodsOk, state.equipmentIds]);

  const ingredientRows = useMemo(() => {
    if (!recipe) return [];
    const base = recipe.baseServings ?? 1;
    return recipe.ingredients.map((ing) => {
      const scaled = scaleAmount(ing.amountPerServing, base, servings);
      const qty = formatScaledQuantity(scaled, ing.unit, ing.quantity);
      return {
        ...ing,
        name: getFoodName(ing.foodId, state.customFoods),
        available: isFoodAvailable(ing.foodId, state.availableFoodIds),
        displayQty: qty,
      };
    });
  }, [recipe, servings, state.availableFoodIds, state.customFoods]);

  if (!recipe) {
    return (
      <div className="page">
        <p>Receta no encontrada.</p>
        <Link to="/">Volver</Link>
      </div>
    );
  }

  const canCook = Boolean(selectedMethod);
  const cookParams = new URLSearchParams();
  if (selectedMethod) cookParams.set('method', selectedMethod.id);
  cookParams.set('servings', String(servings));
  const cookHref = `/receta/${recipe.id}/cocinar?${cookParams.toString()}`;

  function handleDelete() {
    if (!recipe?.custom) return;
    if (!window.confirm(`¿Eliminar la receta «${recipe.name}»?`)) return;
    deleteCustomRecipe(recipe.id);
    navigate('/mis-recetas');
  }

  function changeServings(delta: number) {
    setServings((s) => Math.max(1, Math.min(12, s + delta)));
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
          <span>
            {selectedMethod?.timeMinutes ?? recipe.timeMinutes} min
          </span>
          <span>·</span>
          <span>{displayDifficulty(recipe.difficulty)}</span>
          {selectedMethod && selectedMethod.id !== 'default' && (
            <>
              <span>·</span>
              <span>{selectedMethod.label}</span>
            </>
          )}
        </div>
      </header>

      {recipe.imageUrl ? (
        <img
          src={recipe.imageUrl}
          alt=""
          className="recipe-hero-img"
        />
      ) : null}

      <FodmapBadge level={recipe.fodmap.level} />

      <section className="card servings-card">
        <h2>¿Para cuántos cocinamos?</h2>
        <div className="stepper">
          <button
            type="button"
            className="stepper__btn"
            onClick={() => changeServings(-1)}
            aria-label="Menos comensales"
          >
            −
          </button>
          <span className="stepper__value">{servings}</span>
          <button
            type="button"
            className="stepper__btn"
            onClick={() => changeServings(1)}
            aria-label="Más comensales"
          >
            +
          </button>
        </div>
      </section>

      {methodsOk.length > 1 && (
        <section className="card">
          <h2>Método</h2>
          <label className="field-label" htmlFor="method-select">
            Compatible con tu equipamiento
          </label>
          <select
            id="method-select"
            className="input"
            value={selectedMethod?.id ?? ''}
            onChange={(e) => setMethodId(e.target.value)}
          >
            {methodsOk.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
                {m.temperature ? ` · ${m.temperature}` : ''}
                {m.timeMinutes ? ` · ${m.timeMinutes} min` : ''}
              </option>
            ))}
          </select>
        </section>
      )}

      {!canCook && (
        <p className="card missing">
          Necesitas equipamiento que no tienes marcado. Revisa Ajustes →
          Equipamiento.
          {recipe.methods && recipe.methods.length > 0 && (
            <>
              {' '}
              Métodos posibles:{' '}
              {recipe.methods
                .map(
                  (m) =>
                    `${m.label} (${m.equipmentIds.map(equipmentLabel).join(', ') || 'ninguno'})`,
                )
                .join('; ')}
              .
            </>
          )}
        </p>
      )}

      <section className="card">
        <h2>Ingredientes</h2>
        <ul className="ingredient-list">
          {ingredientRows.map((ing) => (
            <li
              key={ing.foodId + ing.quantity}
              className={ing.available ? '' : 'is-missing'}
            >
              <span>
                {ing.available ? (
                  <>
                    ✓ Tienes {ing.name}
                    {ing.optional ? ' (opcional)' : ''} — necesitarás{' '}
                    {ing.displayQty}
                  </>
                ) : (
                  <>
                    🛒 No tienes {ing.name}
                    {ing.optional ? ' (opcional)' : ''} — necesitarás{' '}
                    {ing.displayQty}
                  </>
                )}
              </span>
            </li>
          ))}
        </ul>
        <p className="muted small">
          Mi cocina indica presencia, no cantidades exactas en casa.
        </p>
      </section>

      {canCook ? (
        <>
          <Link to={cookHref} className="btn btn--primary btn--block btn--xl">
            Empezar a cocinar con Pepper
            {selectedMethod && selectedMethod.id !== 'default'
              ? ` · ${selectedMethod.label}`
              : ''}
          </Link>
          {fromChef && (
            <p className="muted center pepper-cook-hint">
              ¡Buena elección! Vamos a cocinar.
            </p>
          )}
        </>
      ) : (
        <button type="button" className="btn btn--ghost btn--block btn--xl" disabled>
          Falta equipamiento
        </button>
      )}

      {recipe.custom && (
        <div className="custom-recipe-actions">
          <Link
            to={`/mis-recetas/editar/${recipe.id}`}
            className="btn btn--ghost btn--block"
          >
            Editar receta
          </Link>
          <button
            type="button"
            className="btn btn--danger btn--block"
            onClick={handleDelete}
          >
            Eliminar receta
          </button>
        </div>
      )}
    </div>
  );
}
