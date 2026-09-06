import { useState, useRef, useEffect } from "react";
import CategorySwatches from "./CategorySwatches";
import { IconCheck, IconX } from "../lib/icons";
import type { ItemRowData } from "../types";

interface EditRowProps {
  item: ItemRowData;
  onSave: (text: string, category: string) => void;
  onCancel: () => void;
}

export default function EditRow({ item, onSave, onCancel }: EditRowProps) {
  const [text, setText] = useState(item.text);
  const [cat, setCat] = useState(item.category);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function save() {
    if (!text.trim()) {
      onCancel();
      return;
    }
    onSave(text, cat);
  }

  return (
    <div className="sl-edit-row" onClick={(e) => e.stopPropagation()}>
      <input
        ref={inputRef}
        className="sl-edit-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
          if (e.key === "Escape") onCancel();
        }}
      />
      <CategorySwatches value={cat} onChange={setCat} />
      <div style={{ display: "flex", gap: 4 }}>
        <button className="sl-icon-btn" onClick={save} aria-label="Αποθήκευση">
          <IconCheck size={17} />
        </button>
        <button className="sl-icon-btn" onClick={onCancel} aria-label="Ακύρωση">
          <IconX size={17} />
        </button>
      </div>
    </div>
  );
}
