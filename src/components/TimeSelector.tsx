import type { TimeOption } from '../types';

const OPTIONS: { value: TimeOption; label: string }[] = [
  { value: 10, label: '5-10 min' },
  { value: 15, label: '10-15 min' },
  { value: 20, label: '15-20 min' },
  { value: 30, label: '20-30 min' },
  { value: 999, label: 'Sin límite' },
];

interface Props {
  value: TimeOption | null;
  onChange: (v: TimeOption) => void;
}

export function TimeSelector({ value, onChange }: Props) {
  return (
    <div className="time-selector" role="group" aria-label="Tiempo de cocina">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`chip chip--lg${value === opt.value ? ' chip--selected' : ''}`}
          onClick={() => onChange(opt.value)}
          aria-pressed={value === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
