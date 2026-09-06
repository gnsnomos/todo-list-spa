# Ψώνια σπιτιού

Λίστα ψωνίων με κατηγορίες/χρώματα, διαγράμμιση, επεξεργασία, διαγραφή και ιστορικό
προηγούμενων ειδών — συγχρονισμένη ζωντανά μέσω Supabase.

## Δομή project

```
src/
  main.tsx                  σημείο εκκίνησης
  App.tsx                   κύριο component
  index.css                 όλο το styling
  types.ts                  κοινοί τύποι δεδομένων (Category, ItemRowData, HistoryEntry...)
  vite-env.d.ts              typings για μεταβλητές περιβάλλοντος (import.meta.env)
  lib/
    supabaseClient.ts        ρύθμιση σύνδεσης με Supabase
    categories.ts            λίστα κατηγοριών + χρωμάτων (εδώ προσθέτεις/αλλάζεις κατηγορίες)
    icons.tsx                 μικρά SVG εικονίδια
  hooks/
    useShoppingList.ts        όλη η λογική (fetch, realtime, add/edit/delete, ιστορικό)
  components/
    Header.tsx
    AddForm.tsx
    Suggestions.tsx
    FrequentChips.tsx
    CategorySwatches.tsx
    ItemList.tsx
    ItemRow.tsx
    EditRow.tsx
    Summary.tsx
```

## Πρώτη εγκατάσταση

Χρειάζεσαι [Node.js](https://nodejs.org) **20.19+ ή 22.12+** (απαίτηση του Vite 8).

```bash
npm install
```

Το αρχείο `.env` περιέχει ήδη τα στοιχεία σύνδεσης της βάσης σου
(`VITE_SUPABASE_URL`, `VITE_SUPABASE_KEY`). Αν φτιάξεις νέο project Supabase
στο μέλλον, ενημέρωσε αυτές τις δύο τιμές (δες `.env.example` για το πρότυπο).

## Τοπική εκτέλεση (development)

```bash
npm run dev
```

Άνοιξε τον σύνδεσμο που θα εμφανιστεί (συνήθως `http://localhost:5173`).
Κάθε αλλαγή στον κώδικα εμφανίζεται αυτόματα στον browser χωρίς refresh.

## Build για production

```bash
npm run build
```

Αυτό δημιουργεί τον φάκελο `dist/` με το τελικό, βελτιστοποιημένο site.

Για να το δεις όπως θα φαίνεται live:

```bash
npm run preview
```

Ο φάκελος `dist/` μπορεί να ανέβει σε οποιοδήποτε static hosting
(GitHub Pages, Netlify, Vercel, Cloudflare Pages κ.λπ.).

## Deployment στο GitHub Pages (αυτόματο)

Το project περιλαμβάνει ήδη ένα GitHub Actions workflow
(`.github/workflows/deploy.yml`) που κάνει build και δημοσιεύει
αυτόματα σε κάθε push στο `main`.

1. **Άλλαξε το `base` στο `vite.config.js`** ώστε να ταιριάζει με το
   όνομα του repository σου, π.χ. αν το repo λέγεται `psonia`:
   ```js
   base: "/psonia/",
   ```
2. **Πρόσθεσε τα secrets του Supabase στο GitHub repo**
   (Settings → Secrets and variables → Actions → New repository secret):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`

   (Το `.env` δεν ανεβαίνει ποτέ στο GitHub — γι' αυτό χρειάζονται secrets.)
3. **Ενεργοποίησε τη σωστή πηγή για τα Pages**: Settings → Pages →
   στο "Build and deployment" → "Source" επίλεξε **"GitHub Actions"**
   (όχι "Deploy from a branch").
4. Κάνε push στο `main`. Το workflow θα τρέξει αυτόματα (το βλέπεις
   στο tab "Actions") και σε λίγα λεπτά το site θα είναι διαθέσιμο στο
   `https://<username>.github.io/<repo-name>/`.

## Αλλαγή κατηγοριών

Άνοιξε το `src/lib/categories.ts` και πρόσθεσε/άλλαξε αντικείμενα στη μορφή:

```js
{ id: "frozen", label: "Κατεψυγμένα", color: "#5C7AEA" }
```

Το `id` πρέπει να είναι μοναδικό. Δεν χρειάζεται καμία αλλαγή στη βάση δεδομένων.

## Σχήμα βάσης (Supabase)

Πίνακας `items`:

| στήλη       | τύπος       | σημείωση                        |
|-------------|-------------|----------------------------------|
| id          | int8        | αυτόματο primary key             |
| text        | text        | το όνομα του είδους              |
| category    | text        | το id της κατηγορίας             |
| done        | bool        | default false                    |
| created_at  | timestamptz | default now()                    |
| deleted_at  | timestamptz | null εκτός αν έχει "διαγραφεί"   |

Η "διαγραφή" είναι soft-delete: μαρκάρει `deleted_at` αντί να σβήνει τη γραμμή,
ώστε το ιστορικό προτάσεων να θυμάται τα πάντα.
