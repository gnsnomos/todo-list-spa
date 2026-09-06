import EditRow from "./EditRow";
import { IconCheck, IconPencil, IconTrash } from "../lib/icons";
import type { ItemRowData } from "../types";

interface ItemRowProps {
  item: ItemRowData;
  categoryColor: string;
  isEditing: boolean;
  onToggle: (item: ItemRowData) => void;
  onStartEdit: (id: number) => void;
  onSaveEdit: (id: number, text: string, category: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: number) => void;
}

export default function ItemRow({
  item,
  categoryColor,
  isEditing,
  onToggle,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: ItemRowProps) {
  return (
    <li
      className="sl-item"
      style={{ borderLeftColor: categoryColor }}
      onClick={() => !isEditing && onToggle(item)}
    >
      {isEditing ? (
        <EditRow item={item} onSave={(text, cat) => onSaveEdit(item.id, text, cat)} onCancel={onCancelEdit} />
      ) : (
        <>
          <span className={"sl-checkbox" + (item.done ? " checked" : "")}>
            {item.done && <IconCheck size={12} />}
          </span>
          <span className={"sl-item-text" + (item.done ? " done" : "")}>{item.text}</span>
          <div className="sl-item-actions">
            <button
              className="sl-icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit(item.id);
              }}
              aria-label="Επεξεργασία"
            >
              <IconPencil size={16} />
            </button>
            <button
              className="sl-icon-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              aria-label="Διαγραφή"
            >
              <IconTrash size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
