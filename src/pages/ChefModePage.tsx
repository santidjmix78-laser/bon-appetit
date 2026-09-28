import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PepperRecipeCard } from '../components/PepperRecipeCard';
import { useApp } from '../context/AppContext';
import type { Difficulty, DishRole } from '../types';
import {
  browseChefRecipes,
  searchChefRecipes,
  type ChefBrowseDifficulty,
  type ChefBrowseRole,
  type ChefSearchMatch,
} from '../utils/chefSearch';
import { getAllRecipes } from '../utils/helpers';
import {
  pepperModeMeta,
  recommendWithPepper,
  type PepperMode,
} from '../utils/pepperRecommend';

const OPTIONS: Array<{
  id: PepperMode;
  label: string;
  emoji: string;
}> = [
  { id: 'quick', label: 'Algo rápido', emoji: '⚡' },
  { id: 'cook', label: 'Quiero cocinar', emoji: '🍳' },
  { id: 'special', label: 'Algo especial', emoji: '⭐' },
  { id: 'surprise', label: 'Sorpréndeme, Pepper', emoji: '✨' },
];

const PAGE_SIZE = 20;

const DIFF_FILTERS: Array<{ id: ChefBrowseDifficulty; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'fácil', label: 'Fácil' },
  { id: 'media', label: 'Media' },
  { id: 'avanzada', label: 'Avanzada' },
];

const ROLE_FILTERS: Array<{ id: ChefBrowseRole; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'platoPrincipal', label: 'Plato principal' },
  { id: 'desayuno', label: 'Desayuno' },
  { id: 'entrante', label: 'Entrante' },
  { id: 'guarnicion', label: 'Guarnición' },
  { id: 'snack', label: 'Snack' },
];

type ChefSurface = 'welcome' | 'pepper' | 'search' | 'browse';

export function ChefModePage() {
  const { state } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQ = searchParams.get('q') ?? '';
  const urlView = searchParams.get('view');
  const urlDiff = (searchParams.get('diff') as Difficulty | null) || 'all';
  const urlRole = (searchParams.get('role') as DishRole | null) || 'all';

  const [mode, setMode] = useState<PepperMode | null>(null);
  const [shownIds, setShownIds] = useState<string[]>([]);
  const [batchKey, setBatchKey] = useState(0);
  const [queryInput, setQueryInput] = useState(urlQ);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const recipes = useMemo(
    () => getAllRecipes(state.customRecipes),
    [state.customRecipes],
  );

  useEffect(() => {
    setQueryInput(urlQ);
    setVisibleCount(PAGE_SIZE);
  }, [urlQ]);

  const surface: ChefSurface = useMemo(() => {
    if (urlView === 'all' || urlView === 'browse') return 'browse';
    if (urlQ.trim()) return 'search';
    if (mode) return 'pepper';
    return 'welcome';
  }, [urlView, urlQ, mode]);

  const filters = useMemo(
    () => ({
      difficulty: (urlDiff === 'all' || !urlDiff
        ? 'all'
        : urlDiff) as ChefBrowseDifficulty,
      dishRole: (urlRole === 'all' || !urlRole
        ? 'all'
        : urlRole) as ChefBrowseRole,
    }),
    [urlDiff, urlRole],
  );

  const pepperResults = useMemo(() => {
    if (surface !== 'pepper' || !mode) return [];
    void batchKey;
    return recommendWithPepper({
      recipes,
      state,
      mode,
      excludeIds: shownIds,
      limit: 8,
    });
  }, [surface, mode, recipes, state, shownIds, batchKey]);

  const catalogResults: ChefSearchMatch[] = useMemo(() => {
    if (surface === 'search') {
      return searchChefRecipes(recipes, state, urlQ, filters);
    }
    if (surface === 'browse') {
      return browseChefRecipes(recipes, state, filters, urlQ);
    }
    return [];
  }, [surface, recipes, state, urlQ, filters]);

  const visibleResults = useMemo(
    () => catalogResults.slice(0, visibleCount),
    [catalogResults, visibleCount],
  );

  function writeParams(next: {
    q?: string | null;
    view?: string | null;
    diff?: string | null;
    role?: string | null;
  }) {
    const p = new URLSearchParams(searchParams);
    const apply = (key: string, value: string | null | undefined) => {
      if (value == null || value === '' || value === 'all') p.delete(key);
      else p.set(key, value);
    };
    if ('q' in next) apply('q', next.q);
    if ('view' in next) apply('view', next.view);
    if ('diff' in next) apply('diff', next.diff);
    if ('role' in next) apply('role', next.role);
    setSearchParams(p, { replace: true });
    setVisibleCount(PAGE_SIZE);
  }

  function chooseMode(next: PepperMode) {
    setMode(next);
    setShownIds([]);
    setBatchKey((k) => k + 1);
    writeParams({ q: null, view: null, diff: null, role: null });
  }

  function moreIdeas() {
    setShownIds((prev) => [
      ...prev,
      ...pepperResults.map((m) => m.recipe.id),
    ]);
    setBatchKey((k) => k + 1);
  }

  function backToWelcome() {
    setMode(null);
    setShownIds([]);
    writeParams({ q: null, view: null, diff: null, role: null });
    setQueryInput('');
  }

  function commitSearch(raw: string) {
    const q = raw.trim();
    setMode(null);
    if (!q) {
      writeParams({
        q: null,
        view: surface === 'browse' || urlView === 'all' ? 'all' : null,
      });
      return;
    }
    writeParams({
      q,
      view: surface === 'browse' || urlView === 'all' ? 'all' : null,
    });
  }

  function clearSearch() {
    setQueryInput('');
    writeParams({
      q: null,
      view: surface === 'browse' || urlView === 'all' ? 'all' : null,
    });
  }

  function openBrowse() {
    setMode(null);
    writeParams({
      view: 'all',
      q: queryInput.trim() || null,
      diff: null,
      role: null,
    });
  }

  function onSearchSubmit(e: FormEvent) {
    e.preventDefault();
    commitSearch(queryInput);
  }

  useEffect(() => {
    if (surface === 'pepper') return;
    const t = window.setTimeout(() => {
      const next = queryInput.trim();
      const cur = urlQ.trim();
      if (next === cur) return;
      // En welcome no saltar con 1 carácter; Enter o 2+ chars
      if (surface === 'welcome' && next.length > 0 && next.length < 2) return;
      commitSearch(queryInput);
    }, 280);
    return () => window.clearTimeout(t);
    // commitSearch is stable enough via closure; debounce on input only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput, surface]);

  function renderSearchForm(opts: { showAllLink: boolean }) {
    return (
      <form className="pepper-search" onSubmit={onSearchSubmit} role="search">
        <label className="pepper-search__label" htmlFor="pepper-search-input">
          🔎 Buscar una receta o ingrediente
        </label>
        <div className="pepper-search__row">
          <input
            id="pepper-search-input"
            className="pepper-search__input"
            type="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="Ej. arroz, pasta, pollo, Air Fryer..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          {queryInput ? (
            <button
              type="button"
              className="pepper-search__clear"
              aria-label="Limpiar búsqueda"
              onClick={clearSearch}
            >
              ×
            </button>
          ) : null}
        </div>
        {opts.showAllLink ? (
          <button
            type="button"
            className="pepper-search__all"
            onClick={openBrowse}
          >
            Ver todas las recetas
          </button>
        ) : null}
      </form>
    );
  }

  if (surface === 'welcome') {
    return (
      <div className="page page--chef">
        <header className="page-header page-header--with-back">
          <Link to="/" className="back-link">
            ← Inicio
          </Link>
        </header>

        <section className="pepper-welcome">
          <img
            src="/assets/pepper/pepper-master.png"
            alt="Pepper"
            className="pepper-welcome__img"
            width={160}
            height={160}
          />
          <h1 className="pepper-welcome__title">¡Hola! Soy Pepper.</h1>
          <p className="pepper-welcome__msg">
            Estoy listo. ¿Qué vamos a preparar hoy?
          </p>

          <div className="pepper-options">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="pepper-option"
                onClick={() => chooseMode(opt.id)}
              >
                <span className="pepper-option__emoji" aria-hidden>
                  {opt.emoji}
                </span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          <div className="pepper-search-wrap">
            {renderSearchForm({ showAllLink: true })}
          </div>
        </section>
      </div>
    );
  }

  if (surface === 'pepper' && mode) {
    const meta = pepperModeMeta(mode);
    const topLiked = pepperResults.find((m) => (m.likedOverlap ?? 0) > 0);
    const pepperPick =
      pepperResults.find((m) => m.recipe.id !== topLiked?.recipe.id) ??
      pepperResults[0];

    return (
      <div className="page page--chef">
        <header className="page-header page-header--with-back">
          <button type="button" className="back-link" onClick={backToWelcome}>
            ← Pepper
          </button>
          <div className="pepper-results-head">
            <img
              src={meta.pepperSrc}
              alt=""
              className="pepper-results-head__img"
              width={56}
              height={56}
            />
            <div>
              <h1>{meta.title}</h1>
              <p className="subtitle">{meta.message}</p>
            </div>
          </div>
        </header>

        {pepperResults.length === 0 ? (
          <section className="card">
            <p>
              No encuentro más ideas con tu equipamiento y preferencias actuales.
              Prueba otra opción, usa el buscador o revisa «Prefiero evitar» y tu
              equipamiento en Ajustes.
            </p>
            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={backToWelcome}
            >
              Volver a elegir
            </button>
          </section>
        ) : (
          <>
            <div className="recipe-list">
              {pepperResults.map((match) => {
                let badge: 'liked' | 'pepper' | null = null;
                if (topLiked && match.recipe.id === topLiked.recipe.id) {
                  badge = 'liked';
                } else if (
                  pepperPick &&
                  match.recipe.id === pepperPick.recipe.id
                ) {
                  badge = 'pepper';
                }
                return (
                  <PepperRecipeCard
                    key={match.recipe.id}
                    match={match}
                    badge={badge}
                  />
                );
              })}
            </div>
            <button
              type="button"
              className="btn btn--ghost btn--block btn--xl"
              onClick={moreIdeas}
            >
              🔄 Dame otras ideas
            </button>
          </>
        )}
      </div>
    );
  }

  const title =
    surface === 'browse' ? 'Todas las recetas' : 'Resultados de búsqueda';
  const emptyQuery = urlQ.trim();

  return (
    <div className="page page--chef">
      <header className="page-header page-header--with-back">
        <button type="button" className="back-link" onClick={backToWelcome}>
          ← Pepper
        </button>
        <h1>{title}</h1>
      </header>

      <div className="pepper-search-wrap pepper-search-wrap--results">
        {renderSearchForm({ showAllLink: surface === 'search' })}
        {surface === 'browse' && (
          <div className="pepper-filters" aria-label="Filtros">
            <div className="pepper-filters__row">
              {DIFF_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`pepper-chip${filters.difficulty === f.id ? ' is-active' : ''}`}
                  onClick={() =>
                    writeParams({
                      view: 'all',
                      diff: f.id === 'all' ? null : f.id,
                      q: queryInput.trim() || null,
                      role: filters.dishRole === 'all' ? null : filters.dishRole,
                    })
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="pepper-filters__row">
              {ROLE_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`pepper-chip${filters.dishRole === f.id ? ' is-active' : ''}`}
                  onClick={() =>
                    writeParams({
                      view: 'all',
                      role: f.id === 'all' ? null : f.id,
                      q: queryInput.trim() || null,
                      diff:
                        filters.difficulty === 'all' ? null : filters.difficulty,
                    })
                  }
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {catalogResults.length === 0 ? (
        <section className="card pepper-empty">
          <p>
            {emptyQuery
              ? `No he encontrado recetas con «${emptyQuery}».`
              : 'No hay recetas con estos filtros.'}
          </p>
          <div className="pepper-empty__actions">
            {emptyQuery ? (
              <button
                type="button"
                className="btn btn--ghost"
                onClick={clearSearch}
              >
                Limpiar búsqueda
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn--primary"
              onClick={backToWelcome}
            >
              Volver a las ideas de Pepper
            </button>
          </div>
        </section>
      ) : (
        <>
          <p className="pepper-result-count" aria-live="polite">
            {catalogResults.length}{' '}
            {catalogResults.length === 1
              ? 'receta encontrada'
              : 'recetas encontradas'}
          </p>
          <div className="recipe-list">
            {visibleResults.map((match) => (
              <PepperRecipeCard key={match.recipe.id} match={match} />
            ))}
          </div>
          {visibleCount < catalogResults.length ? (
            <button
              type="button"
              className="btn btn--ghost btn--block btn--xl"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
            >
              Mostrar más ({catalogResults.length - visibleCount} restantes)
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
