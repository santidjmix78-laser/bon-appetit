interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function FoodChip({ label, selected, onClick }: Props) {
  return (
    <button
      type="button"
      className={`chip${selected ? ' chip--selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
