import type { Feeling } from '../types';

interface Props {
  value?: Feeling;
  onChange: (f: Feeling) => void;
}

export function FeelingPicker({ value, onChange }: Props) {
  return (
    <div className="feeling-picker">
      <p className="feeling-picker__q">¿Cómo te ha sentado?</p>
      <div className="feeling-picker__row">
        <button
          type="button"
          className={`chip chip--lg${value === 'good' ? ' chip--selected' : ''}`}
          onClick={() => onChange('good')}
        >
          👍 Bien
        </button>
        <button
          type="button"
          className={`chip chip--lg${value === 'ok' ? ' chip--selected' : ''}`}
          onClick={() => onChange('ok')}
        >
          😐 Regular
        </button>
        <button
          type="button"
          className={`chip chip--lg${value === 'bad' ? ' chip--selected' : ''}`}
          onClick={() => onChange('bad')}
        >
          👎 Mal
        </button>
      </div>
    </div>
  );
}
