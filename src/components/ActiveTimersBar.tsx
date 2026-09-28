import { formatMs, useTimers } from '../context/TimerContext';

/** Barra compacta de temporizadores activos / de otras recetas. */
export function ActiveTimersBar({ excludeId }: { excludeId?: string }) {
  const { timers, now, remainingMs, cancelTimer } = useTimers();
  void now;

  const visible = timers.filter((t) => t.id !== excludeId);
  if (visible.length === 0) return null;

  const collapsed = visible.length > 3;

  return (
    <div
      className={`active-timers${collapsed ? ' active-timers--compact' : ''}`}
      aria-live="polite"
    >
      {visible.map((t) => {
        const paused = t.pausedRemainingMs != null && !t.finishedAt;
        const finished = Boolean(t.finishedAt);
        const running = !paused && !finished;

        function handleDismiss() {
          if (running) {
            if (
              !window.confirm(
                `¿Cancelar el temporizador «${t.label}»? Está en marcha.`,
              )
            ) {
              return;
            }
          }
          cancelTimer(t.id);
        }

        return (
          <div
            key={t.id}
            className={`active-timers__item${paused ? ' is-paused' : ''}${finished ? ' is-done' : ''}`}
          >
            <span className="active-timers__text">
              ⏱ {t.recipeName ? `${t.recipeName} · ` : ''}
              {t.label}
              {finished
                ? ' · ¡Listo!'
                : ` · ${formatMs(remainingMs(t.id))}${paused ? ' (pausa)' : ''}`}
            </span>
            <button
              type="button"
              className="active-timers__close"
              aria-label={`Cerrar temporizador ${t.label}`}
              onClick={handleDismiss}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
