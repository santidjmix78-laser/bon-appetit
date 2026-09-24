import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { EQUIPMENT_CATALOG } from '../data/equipment';
import type {
  Difficulty,
  EquipmentId,
  MealType,
  Recipe,
  RecipeIngredient,
} from '../types';
import { getAllFoods, MEAL_TYPE_OPTIONS, slugify } from '../utils/helpers';

export function RecipeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, saveCustomRecipe } = useApp();
  const editing = id
    ? state.customRecipes.find((r) => r.id === id)
    : undefined;

  const foods = useMemo(
    () => getAllFoods(state.customFoods, state.hiddenFoodIds),
    [state.customFoods, state.hiddenFoodIds],
  );

  const [name, setName] = useState(editing?.name ?? '');
  const [mealTypes, setMealTypes] = useState<MealType[]>(
    editing?.mealTypes ?? ['cena'],
  );
  const [timeMinutes, setTimeMinutes] = useState(editing?.timeMinutes ?? 15);
  const [difficulty, setDifficulty] = useState<Difficulty>(
    editing?.difficulty ?? 'fácil',
  );
  const [ingredients, setIngredients] = useState<RecipeIngredient[]>(
    editing?.ingredients?.length
      ? editing.ingredients
      : [{ foodId: foods[0]?.id ?? 'huevos', quantity: 'al gusto' }],
  );
  const [equipmentIds, setEquipmentIds] = useState<EquipmentId[]>(
    editing?.methods?.[0]?.equipmentIds ?? [],
  );
  const [stepsText, setStepsText] = useState(
    (editing?.steps ?? ['']).join('\n'),
  );

  function toggleMeal(t: MealType) {
    setMealTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  function toggleEq(eq: EquipmentId) {
    setEquipmentIds((prev) =>
      prev.includes(eq) ? prev.filter((x) => x !== eq) : [...prev, eq],
    );
  }

  function updateIngredient(index: number, patch: Partial<RecipeIngredient>) {
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, ...patch } : ing)),
    );
  }

  function addIngredientRow() {
    setIngredients((prev) => [
      ...prev,
      { foodId: foods[0]?.id ?? 'huevos', quantity: 'al gusto' },
    ]);
  }

  function removeIngredientRow(index: number) {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed || mealTypes.length === 0) return;
    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (steps.length === 0) {
      window.alert('Añade al menos un paso de preparación.');
      return;
    }
    if (ingredients.length === 0) {
      window.alert('Añade al menos un ingrediente.');
      return;
    }

    const recipeId = editing?.id ?? `custom-recipe-${slugify(trimmed)}-${Date.now().toString(36)}`;
    const recipe: Recipe = {
      id: recipeId,
      name: trimmed,
      timeMinutes: Number(timeMinutes) || 15,
      difficulty,
      mealTypes,
      ingredients,
      steps,
      methods: [
        {
          id: 'custom-main',
          label: equipmentIds.length ? 'Mi método' : 'Sin cocción / manual',
          equipmentIds,
          steps,
        },
      ],
      fodmap: {
        level: 'moderate',
        note: 'Sin orientación FODMAP automática en recetas personalizadas.',
      },
      imageHue: editing?.imageHue ?? Math.floor(Math.random() * 360),
      custom: true,
    };

    saveCustomRecipe(recipe);
    navigate(`/receta/${recipe.id}`);
  }

  return (
    <div className="page">
      <header className="page-header page-header--with-back">
        <Link to="/mis-recetas" className="back-link">
          ← Mis recetas
        </Link>
        <h1>{editing ? 'Editar receta' : 'Crear receta'}</h1>
      </header>

      <label className="field">
        <span>Nombre</span>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Mis croquetas al airfryer"
        />
      </label>

      <div className="field">
        <span>Tipo de comida</span>
        <div className="meal-type-row">
          {MEAL_TYPE_OPTIONS.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`chip${mealTypes.includes(t.id) ? ' chip--selected' : ''}`}
              onClick={() => toggleMeal(t.id)}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>
      </div>

      <label className="field">
        <span>Tiempo aproximado (minutos)</span>
        <input
          className="input"
          type="number"
          min={1}
          max={180}
          value={timeMinutes}
          onChange={(e) => setTimeMinutes(Number(e.target.value))}
        />
      </label>

      <label className="field">
        <span>Dificultad</span>
        <select
          className="input"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        >
          <option value="fácil">Fácil</option>
          <option value="media">Media</option>
        </select>
      </label>

      <div className="field">
        <span>Ingredientes</span>
        {ingredients.map((ing, index) => (
          <div key={index} className="ingredient-form-row">
            <select
              className="input"
              value={ing.foodId}
              onChange={(e) => updateIngredient(index, { foodId: e.target.value })}
            >
              {foods.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <input
              className="input"
              value={ing.quantity}
              onChange={(e) => updateIngredient(index, { quantity: e.target.value })}
              placeholder="Cantidad"
            />
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => removeIngredientRow(index)}
              disabled={ingredients.length <= 1}
            >
              Quitar
            </button>
          </div>
        ))}
        <button type="button" className="btn btn--ghost btn--sm" onClick={addIngredientRow}>
          + Ingrediente
        </button>
        <p className="muted small">
          Usa alimentos de tu biblioteca. Los productos preparados (p. ej. croquetas) son
          ingredientes propios, no se descomponen.
        </p>
      </div>

      <div className="field">
        <span>Equipamiento necesario</span>
        <div className="equipment-grid">
          {EQUIPMENT_CATALOG.map((eq) => (
            <button
              key={eq.id}
              type="button"
              className={`chip${equipmentIds.includes(eq.id) ? ' chip--selected' : ''}`}
              onClick={() => toggleEq(eq.id)}
            >
              {eq.label}
            </button>
          ))}
        </div>
        <p className="muted small">Déjalo vacío si no hace falta cocinar.</p>
      </div>

      <label className="field">
        <span>Pasos (uno por línea)</span>
        <textarea
          className="input textarea"
          rows={8}
          value={stepsText}
          onChange={(e) => setStepsText(e.target.value)}
          placeholder={'Pon una sartén a fuego medio.\nAñade el pollo...'}
        />
      </label>

      <button
        type="button"
        className="btn btn--primary btn--block btn--xl"
        onClick={handleSave}
        disabled={!name.trim() || mealTypes.length === 0}
      >
        Guardar receta
      </button>
    </div>
  );
}
