import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Άλλαξε το "/shopping-list-app/" ώστε να ταιριάζει ΑΚΡΙΒΩΣ με το όνομα
  // του GitHub repository σου (π.χ. αν το repo λέγεται "psonia",
  // βάλε base: "/psonia/"). Αν χρησιμοποιείς custom domain, βάλε base: "/".
  base: "/todo-list-spa/",
});

