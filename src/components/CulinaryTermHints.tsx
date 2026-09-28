import { useMemo, useState, type ReactNode } from 'react';
import { getTerm } from '../data/culinaryTerms';

interface Props {
  termIds?: string[];
  children?: ReactNode;
}

/** Ayuda ⓘ para términos culinarios sin salir de la receta. */
export function CulinaryTermHints({ termIds }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  const terms = useMemo(() => {
    if (!termIds?.length) return [];
    return termIds
      .map((id) => getTerm(id))
      .filter((t): t is NonNullable<typeof t> => Boolean(t));
  }, [termIds]);

  if (terms.length === 0) return null;

  return (
    <div className="term-hints">
      {terms.map((term) => {
        const open = openId === term.id;
        return (
          <div key={term.id} className="term-hint">
            <button
              type="button"
              className="term-hint__btn"
              aria-expanded={open}
              onClick={() => setOpenId(open ? null : term.id)}
            >
              ⓘ {term.name}
            </button>
            {open && <p className="term-hint__def">{term.definition}</p>}
          </div>
        );
      })}
    </div>
  );
}
