import { catOf } from "../lib/categories";

export default function FrequentChips({ chips, onPick }) {
  if (chips.length === 0) return null;
  return (
    <div className="sl-chips">
      <span className="sl-chips-label">Πρόσφατα</span>
      <div className="sl-chips-row">
        {chips.map((h) => (
          <button
            type="button"
            key={h.text}
            className="sl-chip"
            style={{ color: catOf(h.category).color }}
            onClick={() => onPick(h)}
          >
            <span className="sl-swatch-dot" style={{ background: catOf(h.category).color }} />
            {h.text}
          </button>
        ))}
      </div>
    </div>
  );
}
