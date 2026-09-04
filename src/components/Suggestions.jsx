import { catOf } from "../lib/categories";
import { IconPlus } from "../lib/icons.jsx";

export default function Suggestions({ suggestions, onPick }) {
  if (suggestions.length === 0) return null;
  return (
    <ul className="sl-suggest-list">
      {suggestions.map((h) => (
        <li key={h.text}>
          <button type="button" className="sl-suggest-item" onClick={() => onPick(h)}>
            <span className="sl-swatch-dot" style={{ background: catOf(h.category).color }} />
            <span className="sl-suggest-text">{h.text}</span>
            <IconPlus size={14} className="sl-suggest-plus" />
          </button>
        </li>
      ))}
    </ul>
  );
}
