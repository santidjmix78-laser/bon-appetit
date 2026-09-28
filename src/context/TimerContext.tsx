import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export interface ActiveTimer {
  id: string;
  label: string;
  endsAt: number;
  pausedRemainingMs: number | null;
  totalMs: number;
  recipeId?: string;
  recipeName?: string;
  phaseId?: string;
  /** Epoch when finished; shown briefly then auto-dismissed. */
  finishedAt?: number | null;
}

export interface StartTimerMeta {
  recipeId?: string;
  recipeName?: string;
  phaseId?: string;
}

interface TimerContextValue {
  timers: ActiveTimer[];
  now: number;
  startTimer: (
    id: string,
    label: string,
    seconds: number,
    meta?: StartTimerMeta,
  ) => void;
  pauseTimer: (id: string) => void;
  resumeTimer: (id: string) => void;
  adjustTimer: (id: string, deltaSeconds: number) => void;
  cancelTimer: (id: string) => void;
  remainingMs: (id: string) => number;
}

const TimerContext = createContext<TimerContextValue | null>(null);
const STORAGE_KEY = 'bon-appetit-timers-v1';
const FINISHED_KEEP_MS = 8000;

function loadTimers(): ActiveTimer[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ActiveTimer[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveTimers(timers: ActiveTimer[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(timers));
  } catch {
    /* ignore */
  }
}

function notifyDone(label: string) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate?.([200, 100, 200]);
    }
  } catch {
    /* ignore */
  }
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.value = 0.08;
    osc.start();
    setTimeout(() => {
      osc.stop();
      ctx.close();
    }, 400);
  } catch {
    /* ignore */
  }
  console.info(`[Bon Appetit] Temporizador listo: ${label}`);
}

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timers, setTimers] = useState<ActiveTimer[]>(() => loadTimers());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const t = Date.now();
      setNow(t);
      setTimers((prev) => {
        let changed = false;
        const next = prev
          .map((timer) => {
            if (timer.finishedAt) {
              if (t - timer.finishedAt > FINISHED_KEEP_MS) {
                changed = true;
                return null;
              }
              return timer;
            }
            if (timer.pausedRemainingMs != null) return timer;
            const left = timer.endsAt - t;
            if (left <= 0) {
              changed = true;
              notifyDone(timer.label);
              return {
                ...timer,
                finishedAt: t,
                pausedRemainingMs: 0,
                endsAt: t,
              };
            }
            return timer;
          })
          .filter((x): x is ActiveTimer => x != null);
        return changed ? next : prev;
      });
    }, 250);
    return () => clearInterval(id);
  }, []);

  const startTimer = useCallback(
    (id: string, label: string, seconds: number, meta?: StartTimerMeta) => {
      const totalMs = Math.max(1, seconds) * 1000;
      setTimers((prev) => {
        const others = prev.filter((t) => t.id !== id);
        return [
          ...others,
          {
            id,
            label,
            endsAt: Date.now() + totalMs,
            pausedRemainingMs: null,
            totalMs,
            finishedAt: null,
            recipeId: meta?.recipeId,
            recipeName: meta?.recipeName,
            phaseId: meta?.phaseId,
          },
        ];
      });
    },
    [],
  );

  const pauseTimer = useCallback((id: string) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id !== id || t.pausedRemainingMs != null || t.finishedAt) return t;
        return {
          ...t,
          pausedRemainingMs: Math.max(0, t.endsAt - Date.now()),
        };
      }),
    );
  }, []);

  const resumeTimer = useCallback((id: string) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id !== id || t.pausedRemainingMs == null || t.finishedAt) return t;
        return {
          ...t,
          endsAt: Date.now() + t.pausedRemainingMs,
          pausedRemainingMs: null,
        };
      }),
    );
  }, []);

  const adjustTimer = useCallback((id: string, deltaSeconds: number) => {
    const delta = deltaSeconds * 1000;
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id !== id || t.finishedAt) return t;
        if (t.pausedRemainingMs != null) {
          return {
            ...t,
            pausedRemainingMs: Math.max(1000, t.pausedRemainingMs + delta),
            totalMs: Math.max(1000, t.totalMs + delta),
          };
        }
        return {
          ...t,
          endsAt: t.endsAt + delta,
          totalMs: Math.max(1000, t.totalMs + delta),
        };
      }),
    );
  }, []);

  const cancelTimer = useCallback((id: string) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const remainingMs = useCallback(
    (id: string) => {
      const t = timers.find((x) => x.id === id);
      if (!t) return 0;
      if (t.finishedAt) return 0;
      if (t.pausedRemainingMs != null) return t.pausedRemainingMs;
      return Math.max(0, t.endsAt - now);
    },
    [timers, now],
  );

  const value = useMemo(
    () => ({
      timers,
      now,
      startTimer,
      pauseTimer,
      resumeTimer,
      adjustTimer,
      cancelTimer,
      remainingMs,
    }),
    [
      timers,
      now,
      startTimer,
      pauseTimer,
      resumeTimer,
      adjustTimer,
      cancelTimer,
      remainingMs,
    ],
  );

  return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
}

export function useTimers(): TimerContextValue {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error('useTimers must be used within TimerProvider');
  return ctx;
}

export function formatMs(ms: number): string {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
