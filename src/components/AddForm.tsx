import { useState, useRef } from "react";
import CategorySwatches from "./CategorySwatches";
import Suggestions from "./Suggestions";
import FrequentChips from "./FrequentChips";
import { CATEGORIES } from "../lib/categories";
import { IconPlus } from "../lib/icons";
import type { HistoryEntry, ItemRowData } from "../types";

interface AddFormProps {
  history: HistoryEntry[];
  activeItems: ItemRowData[];
  onAdd: (text: string, category: string) => void;
}

export default function AddForm({ history, activeItems, onAdd }: AddFormProps) {
  const [text, setText] = useState("");
  const [cat, setCat] = useState<string>(CATEGORIES[0].id);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const activeTextsLower = new Set(activeItems.map((r) => r.text.toLowerCase()));
  const trimmed = text.trim().toLowerCase();

  const suggestions = trimmed
    ? history
        .filter((h) => h.text.toLowerCase() !== trimmed && h.text.toLowerCase().includes(trimmed))
        .sort((a, b) => b.count - a.count || b.lastUsed - a.lastUsed)
        .slice(0, 5)
    : [];

  const frequentChips = !trimmed
    ? history
        .filter((h) => !activeTextsLower.has(h.text.toLowerCase()))
        .sort((a, b) => b.count - a.count || b.lastUsed - a.lastUsed)
        .slice(0, 8)
    : [];

  function submit(overrideText?: string, overrideCat?: string) {
    const value = overrideText !== undefined ? overrideText : text;
    const category = overrideCat !== undefined ? overrideCat : cat;
    if (!value.trim()) return;
    onAdd(value, category);
    setText("");
    inputRef.current?.focus();
  }

  return (
    <div className="sl-form">
      <div className="sl-form-row">
        <input
          ref={inputRef}
          className="sl-input"
          type="text"
          placeholder="π.χ. τυρί φέτα, μήλα, κοτόπουλο..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setTimeout(() => setInputFocused(false), 120)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button className="sl-add-btn" type="button" onClick={() => submit()} disabled={!text.trim()} aria-label="Προσθήκη">
          <IconPlus size={20} />
        </button>
      </div>

      <Suggestions suggestions={suggestions} onPick={(h) => submit(h.text, h.category)} />

      {inputFocused && <FrequentChips chips={frequentChips} onPick={(h) => submit(h.text, h.category)} />}

      <CategorySwatches value={cat} onChange={setCat} />
    </div>
  );
}
