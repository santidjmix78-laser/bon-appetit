import { useMemo, useState } from 'react';
import { FoodChip } from '../components/FoodChip';
import { useApp } from '../context/AppContext';
import { CATEGORY_LABELS, ZONE_LABELS } from '../data/foods';
import type { FoodCategory, FoodItem, StorageZone } from '../types';
import { getAllFoods, normalizeSearch } from '../utils/helpers';

const ZONES: StorageZone[] = ['nevera', 'congelador', 'despensa'];
const CATEGORIES: FoodCategory[] = [
  'verduras',
  'frutas',
  'proteinas',
  'lacteos',
  'cereales',
  'conservas',
  'preparados',
  'otros',
];

export function KitchenPage() {
  const {
    state,
    toggleFood,
    isAvailable,
    addCustomFood,
    removeFromLibrary,
    clearKitchenLibrary,
    restoreDefaultKitchen,
  } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [zone, setZone] = useState<StorageZone>('nevera');
  const [category, setCategory] = useState<FoodCategory>('otros');
  const [openZone, setOpenZone] = useState<StorageZone | null>('nevera');
  const [query, setQuery] = useState('');

  const foods = useMemo(
    () => getAllFoods(state.customFoods, state.hiddenFoodIds),
    [state.customFoods, state.hiddenFoodIds],
  );
  const availableCount = state.availableFoodIds.length;
  const libraryCount = foods.length;

  const searchResults = useMemo(() => {
    const q = normalizeSearch(query);
    if (!q) return [] as FoodItem[];
    return foods.filter((f) => normalizeSearch(f.name).includes(q));
  }, [foods, query]);

  const zoneAvailableCounts = useMemo(() => {
    const counts: Record<StorageZone, number> = {
      nevera: 0,
      congelador: 0,
      despensa: 0,
    };
    for (const food of foods) {
      if (state.availableFoodIds.includes(food.id)) {
        counts[food.zone] += 1;
      }
    }
    return counts;
  }, [foods, state.availableFoodIds]);

  function handleAdd() {
    if (!name.trim()) return;
    addCustomFood(name, zone, category);
    setName('');
    setShowAdd(false);
  }

  function handleNewList() {
    if (
      !window.confirm(
        '¿Quieres empezar una nueva lista?\nSe eliminarán los alimentos de Mi cocina, pero no tu historial, favoritos ni otros datos.',
      )
    ) {
      return;
    }
    clearKitchenLibrary();
  }

  function handleRestore() {
    if (
      !window.confirm(
        '¿Restaurar la lista inicial de Bon Appetit?\nSe recuperará la biblioteca predeterminada. No se borrarán historial, favoritos ni valoraciones.',
      )
    ) {
      return;
    }
    restoreDefaultKitchen();
  }

  function handleRemove(foodId: string, foodName: string) {
    if (
      !window.confirm(
        `¿Eliminar «${foodName}» de tu biblioteca?\nDejará de aparecer en Mi cocina. Puedes volver a añadirlo más tarde.`,
      )
    ) {
      return;
    }
    removeFromLibrary(foodId);
  }

  function toggleZone(z: StorageZone) {
    setOpenZone((prev) => (prev === z ? null : z));
  }

  const isSearching = normalizeSearch(query).length > 0;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Mi cocina</h1>
        <p className="subtitle">
          Toca para marcar disponible. {availableCount} disponibles · {libraryCount} en biblioteca.
        </p>
      </header>

      <label className="field kitchen-search">
        <span className="sr-only">Buscar alimento</span>
        <input
          className="input"
          type="search"
          placeholder="Buscar alimento..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
      </label>

      <button type="button" className="btn btn--primary btn--block" onClick={() => setShowAdd(true)}>
        + Añadir alimento
      </button>

      <div className="kitchen-toolbar">
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleNewList}>
          Nueva lista
        </button>
        <button type="button" className="btn btn--ghost btn--sm" onClick={handleRestore}>
          Restaurar lista inicial
        </button>
      </div>

      <p className="muted small kitchen-legend">
        Acento = lo tienes ahora · Gris = en tu lista, pero no disponible · × = quitar de la biblioteca
      </p>

      {libraryCount === 0 ? (
        <div className="empty-state card">
          <p>Tu biblioteca está vacía.</p>
          <p className="muted">Añade alimentos con «+ Añadir alimento» o restaura la lista inicial.</p>
        </div>
      ) : isSearching ? (
        <section className="card search-results">
          <h2>
            Resultados
            {searchResults.length > 0 ? ` (${searchResults.length})` : ''}
          </h2>
          {searchResults.length === 0 ? (
            <p className="muted">No hay alimentos que coincidan con «{query.trim()}».</p>
          ) : (
            <ul className="search-result-list">
              {searchResults.map((food) => {
                const available = isAvailable(food.id);
                return (
                  <li key={food.id} className="search-result-item">
                    <div>
                      <strong>{food.name}</strong>
                      <p className="muted small">
                        {ZONE_LABELS[food.zone]} · {CATEGORY_LABELS[food.category]}
                      </p>
                      <p className={available ? 'ok small' : 'muted small'}>
                        {available ? 'Disponible' : 'No disponible'}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`chip${available ? ' chip--selected' : ''}`}
                      onClick={() => toggleFood(food.id)}
                    >
                      {available ? 'Quitar' : 'Activar'}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <button
            type="button"
            className="btn btn--ghost btn--block"
            style={{ marginTop: '1rem' }}
            onClick={() => setQuery('')}
          >
            ← Volver a Mi cocina
          </button>
        </section>
      ) : (
        ZONES.map((z) => {
          const zoneFoods = foods.filter((f) => f.zone === z);
          if (zoneFoods.length === 0) return null;
          const isOpen = openZone === z;
          return (
            <section key={z} className={`zone-accordion${isOpen ? ' zone-accordion--open' : ''}`}>
              <button
                type="button"
                className="zone-accordion__header"
                onClick={() => toggleZone(z)}
                aria-expanded={isOpen}
              >
                <span className="zone-accordion__chevron" aria-hidden>
                  {isOpen ? '⌄' : '▸'}
                </span>
                <span className="zone-accordion__title">{ZONE_LABELS[z]}</span>
                <span className="zone-accordion__count">
                  {zoneAvailableCounts[z]} disponibles
                </span>
              </button>
              {isOpen && (
                <div className="zone-accordion__body">
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
                              onRemove={() => handleRemove(food.id, food.name)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })
      )}

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
