import { formatMs, useTimers, type StartTimerMeta } from '../context/TimerContext';

interface Props {
  timerId: string;
  label: string;
  recommendedSeconds: number;
  seconds: number;
  meta?: StartTimerMeta;
  onSecondsChange?: (seconds: number) => void;
  temperatureC?: number | null;
  onTemperatureChange?: (c: number) => void;
  onResetRecommended?: () => void;
  showReset?: boolean;
}

/** Temporizador discreto basado en timestamps (resiste throttling / cambio de pantalla). */
export function StepTimer({
  timerId,
  label,
  recommendedSeconds,
  seconds,
  meta,
  onSecondsChange,
  temperatureC,
  onTemperatureChange,
  onResetRecommended,
  showReset,
}: Props) {
  const {
    timers,
    now,
    startTimer,
    pauseTimer,
    resumeTimer,
    adjustTimer,
    cancelTimer,
    remainingMs,
  } = useTimers();

  void now;

  const active = timers.find((t) => t.id === timerId && !t.finishedAt);
  const left = active ? remainingMs(timerId) : seconds * 1000;
  const paused = active?.pausedRemainingMs != null;

  function bumpIdle(deltaMin: number) {
    const next = Math.max(60, seconds + deltaMin * 60);
    onSecondsChange?.(next);
    if (active) {
      adjustTimer(timerId, deltaMin * 60);
    }
  }

  function start(secs: number) {
    startTimer(timerId, label, secs, meta);
  }

  return (
    <div
      className={`step-timer${active ? ' step-timer--active' : ''}${paused ? ' is-paused' : ''}`}
    >
      <span className="step-timer__label">
        ⏱ {label} · {formatMs(left)}
        {!active && seconds !== recommendedSeconds && (
          <span className="step-timer__tweak"> (ajustado)</span>
        )}
      </span>

      {temperatureC != null && onTemperatureChange && (
        <div className="step-timer__temp">
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => onTemperatureChange(Math.max(140, temperatureC - 5))}
          >
            −
          </button>
          <span>{temperatureC} °C</span>
          <button
            type="button"
            className="btn btn--ghost btn--sm"
            onClick={() => onTemperatureChange(Math.min(250, temperatureC + 5))}
          >
            +
          </button>
        </div>
      )}

      <div className="step-timer__actions">
        {!active ? (
          <>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => bumpIdle(-1)}
            >
              −1 min
            </button>
            <button
              type="button"
              className="btn btn--primary btn--sm"
              onClick={() => start(seconds)}
            >
              ▶ Iniciar
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => bumpIdle(1)}
            >
              +1 min
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                adjustTimer(timerId, -60);
                onSecondsChange?.(Math.max(60, seconds - 60));
              }}
            >
              −1
            </button>
            {paused ? (
              <button
                type="button"
                className="btn btn--primary btn--sm"
                onClick={() => resumeTimer(timerId)}
              >
                ▶
              </button>
            ) : (
              <button
                type="button"
                className="btn btn--ghost btn--sm"
                onClick={() => pauseTimer(timerId)}
              >
                ⏸
              </button>
            )}
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => {
                adjustTimer(timerId, 60);
                onSecondsChange?.(seconds + 60);
              }}
            >
              +1
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => cancelTimer(timerId)}
              aria-label="Cancelar temporizador"
            >
              ✕
            </button>
          </>
        )}
      </div>

      {showReset && onResetRecommended && (
        <button
          type="button"
          className="text-link step-timer__reset"
          onClick={onResetRecommended}
        >
          Restablecer recomendado ({Math.round(recommendedSeconds / 60)} min
          {temperatureC != null ? '' : ''})
        </button>
      )}
    </div>
  );
}
