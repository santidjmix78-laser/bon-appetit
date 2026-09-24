import type { FodmapLevel } from '../types';

const LABELS: Record<FodmapLevel, { emoji: string; text: string }> = {
  low: { emoji: '🟢', text: 'Bajo riesgo orientativo' },
  moderate: { emoji: '🟡', text: 'Moderado / depende de cantidad' },
  high: { emoji: '🔴', text: 'Alto riesgo orientativo' },
};

interface Props {
  level: FodmapLevel;
  compact?: boolean;
}

export function FodmapBadge({ level, compact }: Props) {
  const { emoji, text } = LABELS[level];
  return (
    <div className={`fodmap-badge fodmap-badge--${level}`}>
      <span className="fodmap-badge__label">Orientación FODMAP</span>
      <span className="fodmap-badge__value">
        {emoji} {compact ? text.split(' /')[0] : text}
      </span>
      {!compact && (
        <p className="fodmap-badge__note">
          Puede depender de la cantidad y tolerancia personal.
        </p>
      )}
    </div>
  );
}
