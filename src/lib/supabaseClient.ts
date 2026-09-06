import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_KEY;

if (!url || !key) {
  console.warn(
    "Λείπουν τα VITE_SUPABASE_URL / VITE_SUPABASE_KEY. Δημιούργησε ένα αρχείο .env (δες .env.example)."
  );
}

export const supabase = createClient(url, key);
