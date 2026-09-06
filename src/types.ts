export interface Category {
  id: string;
  label: string;
  color: string;
}

/** Μία γραμμή του πίνακα "items" στη βάση, όπως έρχεται από το Supabase. */
export interface ItemRowData {
  id: number;
  text: string;
  category: string;
  done: boolean;
  created_at: string;
  deleted_at: string | null;
}

/** Συγκεντρωτική καταχώρηση ιστορικού (πόσες φορές / πότε χρησιμοποιήθηκε ένα είδος). */
export interface HistoryEntry {
  text: string;
  category: string;
  count: number;
  lastUsed: number;
}

export type SyncState = "ok" | "busy" | "error";
