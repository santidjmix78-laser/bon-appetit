import { useMemo, useState } from 'react';
import { FoodChip } from '../components/FoodChip';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, ZONE_LABELS } from '../data/foods';
import type { FoodCategory, StorageZone } from '../types';
import { getAllFoods } from '../utils/helpers';

const ZONES: StorageZone[] = ['nevera', 'congelador', 'despensa'];
const CATEGORIES: FoodCategory[] = [
  'verduras',
  'frutas',
  'proteinas',
  'lacteos',
  'cereales',
  'conservas',
  'otros',
];

export function KitchenPage() {
  const { state, toggleFood, isAvailable, addCustomFood } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [zone, setZone] = useState<StorageZone>('nevera');
  const [category, setCategory] = useState<FoodCategory>('otros');

  const foods = useMemo(() => getAllFoods(state.customFoods), [state.customFoods]);
  const availableCount = state.availableFoodIds.length;

  function handleAdd() {
    if (!name.trim()) return;
    addCustomFood(name, zone, category);
    setName('');
    setShowAdd(false);
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mi cocina</h1>
        <p className="subtitle">
          Marca lo que tienes. {availableCount} alimentos disponibles.
        </p>
      </header>

      <button type="button" className="btn btn--primary btn--block" onClick={() => setShowAdd(true)}>
        + Añadir alimento
      </button>

      {ZONES.map((z) => {
        const zoneFoods = foods.filter((f) => f.zone === z);
        if (zoneFoods.length === 0) return null;
        return (
          <section key={z} className="zone-section">
            <h2 className="zone-title">{ZONE_LABELS[z]}</h2>
            {CATEGORIES.map((cat) => {
              const items = zoneFoods.filter((f) => f.category === cat);
              if (items.length === 0) return null;
              return (
                <div key={cat} className="category-block">
                  <h3 className="category-title">{CATEGORY_LABELS[cat]}</h3>
                  <div className="chip-grid">
                    {items.map((food) => (
                      <FoodChip
                        key={food.id}
                        label={food.name}
                        selected={isAvailable(food.id)}
                        onClick={() => toggleFood(food.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}

      {showAdd && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal">
            <h2>Añadir alimento</h2>
            <label className="field">
              <span>Nombre</span>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Espárragos"
                autoFocus
              />
            </label>
            <label className="field">
              <span>Zona</span>
              <select className="input" value={zone} onChange={(e) => setZone(e.target.value as StorageZone)}>
                {ZONES.map((z) => (
                  <option key={z} value={z}>
                    {ZONE_LABELS[z]}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Categoría</span>
              <select
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </label>
            <div className="modal__actions">
              <button type="button" className="btn btn--primary btn--block" onClick={handleAdd} disabled={!name.trim()}>
                Guardar
              </button>
              <button type="button" className="btn btn--ghost btn--block" onClick={() => setShowAdd(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
