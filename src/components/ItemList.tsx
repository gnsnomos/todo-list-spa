import { CATEGORIES } from "../lib/categories";
import ItemRow from "./ItemRow";
import type { ItemRowData } from "../types";

interface ItemListProps {
  activeItems: ItemRowData[];
  editingId: number | null;
  onToggle: (item: ItemRowData) => void;
  onStartEdit: (id: number) => void;
  onSaveEdit: (id: number, text: string, category: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export default function ItemList({
  activeItems,
  editingId,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: ItemListProps) {
  const grouped = CATEGORIES.map((c) => ({
    ...c,
    entries: activeItems.filter((i) => i.category === c.id),
  })).filter((g) => g.entries.length > 0);

  if (grouped.length === 0) {
    return <div className="sl-empty">Η λίστα είναι άδεια — πρόσθεσε το πρώτο σου είδος από πάνω.</div>;
  }

  return (
    <>
      {grouped.map((g) => (
        <div className="sl-group" key={g.id}>
          <h2 className="sl-group-title" style={{ color: g.color }}>
            <span className="sl-group-dot" style={{ background: g.color }} />
            {g.label}
          </h2>
          <ul className="sl-list">
            {g.entries.map((it) => (
              <ItemRow
                key={it.id}
                item={it}
                categoryColor={g.color}
                isEditing={editingId === it.id}
                onToggle={onToggle}
                onStartEdit={onStartEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
