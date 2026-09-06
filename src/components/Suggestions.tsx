import { catOf } from "../lib/categories";
import { IconPlus } from "../lib/icons";
import type { HistoryEntry } from "../types";

interface SuggestionsProps {
  suggestions: HistoryEntry[];
  onPick: (h: HistoryEntry) => void;
}

export default function Suggestions({ suggestions, onPick }: SuggestionsProps) {
  if (suggestions.length === 0) return null;
  return (
    <ul className="sl-suggest-list">
      {suggestions.map((h) => (
        <li key={h.text}>
          <button type="button" className="sl-suggest-item" onClick={() => onPick(h)}>
            <span className="sl-swatch-dot" style={{ background: catOf(h.category).color }} />
            <span className="sl-suggest-text">{h.text}</span>
            <IconPlus size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
}
