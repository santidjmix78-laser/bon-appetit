interface Props {
  label: string;
  selected: boolean;
  onClick: () => void;
  onRemove?: () => void;
}

export function FoodChip({ label, selected, onClick, onRemove }: Props) {
  return (
    <div className={`chip-wrap${selected ? ' chip-wrap--selected' : ''}`}>
      <button
        type="button"
        className={`chip${selected ? ' chip--selected' : ''}`}
        onClick={onClick}
        aria-pressed={selected}
      >
        {label}
      </button>
      {onRemove && (
        <button
          type="button"
          className="chip-remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={`Eliminar ${label} de la biblioteca`}
          title="Eliminar de mi biblioteca"
        >
          ×
        </button>
      )}
    </div>
  );
}
