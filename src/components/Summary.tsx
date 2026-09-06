import type { ItemRowData } from "../types";

interface SummaryProps {
  activeItems: ItemRowData[];
  onClearDone: () => void;
}

export default function Summary({ activeItems, onClearDone }: SummaryProps) {
  if (activeItems.length === 0) return null;
  const remaining = activeItems.filter((i) => !i.done).length;
  const hasDone = activeItems.some((i) => i.done);

  return (
    <div className="sl-summary">
      <span>
        {remaining} από {activeItems.length} έμειναν
      </span>
      {hasDone && (
        <button className="sl-clear-btn" onClick={onClearDone}>
          Καθάρισμα αγορασμένων
        </button>
      )}
    </div>
  );
}
