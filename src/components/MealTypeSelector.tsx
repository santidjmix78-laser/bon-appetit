import type { MealType } from '../types';
import { MEAL_TYPE_OPTIONS } from '../utils/helpers';

interface Props {
  value: MealType | null;
  onChange: (v: MealType) => void;
  question?: string;
}

export function MealTypeSelector({
  value,
  onChange,
  question = '¿Qué quieres preparar?',
}: Props) {
  return (
    <div className="meal-type-selector">
      {question && <h2 className="section-q">{question}</h2>}
      <div className="time-selector" role="group" aria-label="Tipo de comida">
        {MEAL_TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            type="button"
            className={`chip chip--lg${value === opt.id ? ' chip--selected' : ''}`}
            onClick={() => onChange(opt.id)}
            aria-pressed={value === opt.id}
          >
            {opt.emoji} {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
