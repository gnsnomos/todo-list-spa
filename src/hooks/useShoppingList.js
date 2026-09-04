import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";

export function useShoppingList() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncState, setSyncState] = useState("ok"); // ok | busy | error

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      setSyncState("error");
      return;
    }
    setRows(data || []);
    setSyncState("ok");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    const channel = supabase
      .channel("items-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "items" }, () => fetchAll())
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [fetchAll]);

  async function addItem(text, category) {
    const value = text.trim();
    if (!value) return;
    setSyncState("busy");
    const { error } = await supabase.from("items").insert({ text: value, category, done: false });
    if (error) setSyncState("error");
  }

  async function toggleDone(row) {
    setSyncState("busy");
    const { error } = await supabase.from("items").update({ done: !row.done }).eq("id", row.id);
    if (error) setSyncState("error");
  }

  async function editItem(id, text, category) {
    const value = text.trim();
    if (!value) return;
    setSyncState("busy");
    const { error } = await supabase.from("items").update({ text: value, category }).eq("id", id);
    if (error) setSyncState("error");
  }

  async function removeItem(id) {
    setSyncState("busy");
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) setSyncState("error");
  }

  async function clearDoneIds(ids) {
    if (ids.length === 0) return;
    setSyncState("busy");
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", ids);
    if (error) setSyncState("error");
  }

  const activeItems = rows.filter((r) => !r.deleted_at);

  // ιστορικό: συγκεντρωτικά στοιχεία από ΟΛΕΣ τις γραμμές (ακόμη κι όσες έχουν διαγραφεί)
  const historyMap = {};
  rows.forEach((r) => {
    const key = r.text.toLowerCase();
    const ts = new Date(r.created_at).getTime() || 0;
    if (!historyMap[key]) {
      historyMap[key] = { text: r.text, category: r.category, count: 1, lastUsed: ts };
    } else {
      historyMap[key].count += 1;
      if (ts > historyMap[key].lastUsed) {
        historyMap[key].lastUsed = ts;
        historyMap[key].category = r.category;
        historyMap[key].text = r.text;
      }
    }
  });
  const history = Object.values(historyMap);

  return {
    loading,
    syncState,
    activeItems,
    history,
    addItem,
    toggleDone,
    editItem,
    removeItem,
    clearDoneIds,
  };
}
