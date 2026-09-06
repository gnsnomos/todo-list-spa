import { CATEGORIES } from "../lib/categories";

interface CategorySwatchesProps {
  value: string;
  onChange: (id: string) => void;
}

export default function CategorySwatches({ value, onChange }: CategorySwatchesProps) {
  return (
    <div className="sl-swatches">
      {CATEGORIES.map((c) => (
        <button
          type="button"
          key={c.id}
          className={"sl-swatch" + (value === c.id ? " active" : "")}
          style={{ color: value === c.id ? c.color : undefined }}
          onClick={() => onChange(c.id)}
        >
          <span className="sl-swatch-dot" style={{ background: c.color }} />
          {c.label}
        </button>
      ))}
    </div>
  );
}
