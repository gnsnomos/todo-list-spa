import { useState } from "react";
import { useShoppingList } from "./hooks/useShoppingList";
import Header from "./components/Header.jsx";
import AddForm from "./components/AddForm.jsx";
import Summary from "./components/Summary.jsx";
import ItemList from "./components/ItemList.jsx";

export default function App() {
  const {
    loading,
    syncState,
    activeItems,
    history,
    addItem,
    toggleDone,
    editItem,
    removeItem,
    clearDoneIds,
  } = useShoppingList();

  const [editingId, setEditingId] = useState(null);

  function handleClearDone() {
    const ids = activeItems.filter((i) => i.done).map((i) => i.id);
    clearDoneIds(ids);
  }

  return (
    <div className="sl-root">
      <div className="sl-shell">
        <Header syncState={syncState} />

        <AddForm history={history} activeItems={activeItems} onAdd={addItem} />

        {loading && <div className="sl-empty">Φόρτωση λίστας...</div>}

        {!loading && (
          <>
            <Summary activeItems={activeItems} onClearDone={handleClearDone} />
            <ItemList
              activeItems={activeItems}
              editingId={editingId}
              onToggle={toggleDone}
              onStartEdit={setEditingId}
              onSaveEdit={(id, text, cat) => {
                editItem(id, text, cat);
                setEditingId(null);
              }}
              onCancelEdit={() => setEditingId(null)}
              onDelete={removeItem}
            />
          </>
        )}

        {syncState === "error" && (
          <div className="sl-status">
            Πρόβλημα σύνδεσης με τη βάση — έλεγξε το internet ή τα στοιχεία σύνδεσης στο .env
          </div>
        )}
      </div>
    </div>
  );
}
