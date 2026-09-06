import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabaseClient";
import type { ItemRowData, HistoryEntry, SyncState } from "../types";

export function useShoppingList() {
  const [rows, setRows] = useState<ItemRowData[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncState, setSyncState] = useState<SyncState>("ok");

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      setSyncState("error");
      return;
    }
    setRows((data as ItemRowData[]) || []);
    setSyncState("ok");
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
    const channel = supabase
      .channel("items-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "items" }, () => fetchAll())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchAll]);

  async function addItem(text: string, category: string) {
    const value = text.trim();
    if (!value) return;
    setSyncState("busy");
    const { error } = await supabase.from("items").insert({ text: value, category, done: false });
    if (error) {
      setSyncState("error");
      return;
    }
    await fetchAll();
  }

  async function toggleDone(row: ItemRowData) {
    setSyncState("busy");
    const { error } = await supabase.from("items").update({ done: !row.done }).eq("id", row.id);
    if (error) {
      setSyncState("error");
      return;
    }
    await fetchAll();
  }

  async function editItem(id: number, text: string, category: string) {
    const value = text.trim();
    if (!value) return;
    setSyncState("busy");
    const { error } = await supabase.from("items").update({ text: value, category }).eq("id", id);
    if (error) {
      setSyncState("error");
      return;
    }
    await fetchAll();
  }

  async function removeItem(id: number) {
    setSyncState("busy");
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      setSyncState("error");
      return;
    }
    await fetchAll();
  }

  async function clearDoneIds(ids: number[]) {
    if (ids.length === 0) return;
    setSyncState("busy");
    const { error } = await supabase
      .from("items")
      .update({ deleted_at: new Date().toISOString() })
      .in("id", ids);
    if (error) {
      setSyncState("error");
      return;
    }
    await fetchAll();
  }

  const activeItems = rows.filter((r) => !r.deleted_at);

  // ιστορικό: συγκεντρωτικά στοιχεία από ΟΛΕΣ τις γραμμές (ακόμη κι όσες έχουν διαγραφεί)
  const historyMap: Record<string, HistoryEntry> = {};
  rows.forEach((r) => {
    const key = r.text.toLowerCase();
    const ts = new Date(r.created_at).getTime() || 0;
    const existing = historyMap[key];
    if (!existing) {
      historyMap[key] = { text: r.text, category: r.category, count: 1, lastUsed: ts };
    } else {
      existing.count += 1;
      if (ts > existing.lastUsed) {
        existing.lastUsed = ts;
        existing.category = r.category;
        existing.text = r.text;
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
