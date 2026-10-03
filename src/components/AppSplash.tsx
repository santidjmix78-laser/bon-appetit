import { useEffect, useState, type ReactNode } from 'react';

const SPLASH_MS = 1500;
const FADE_MS = 420;

type Phase = 'in' | 'out' | 'done';

/**
 * Splash de arranque (una vez por carga de la app, no entre rutas).
 */
export function AppSplash({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('in');

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setPhase('done');
      return;
    }

    const fadeTimer = window.setTimeout(() => setPhase('out'), SPLASH_MS);
    const doneTimer = window.setTimeout(
      () => setPhase('done'),
      SPLASH_MS + FADE_MS,
    );
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  return (
    <>
      {children}
      {phase !== 'done' && (
        <div
          className={`app-splash${phase === 'out' ? ' app-splash--out' : ''}`}
          aria-hidden="true"
        >
          <img
            className="app-splash__logo"
            src="/assets/branding/bon-appetit-logo.png"
            alt=""
            width={720}
            height={720}
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}
    </>
  );
}
