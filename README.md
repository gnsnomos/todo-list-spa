# Ψώνια σπιτιού

Λίστα ψωνίων με κατηγορίες/χρώματα, διαγράμμιση, επεξεργασία, διαγραφή και ιστορικό
προηγούμενων ειδών — συγχρονισμένη ζωντανά μέσω Supabase.

## Δομή project

```
src/
  main.jsx                 σημείο εκκίνησης
  App.jsx                  κύριο component
  index.css                όλο το styling
  lib/
    supabaseClient.js       ρύθμιση σύνδεσης με Supabase
    categories.js           λίστα κατηγοριών + χρωμάτων (εδώ προσθέτεις/αλλάζεις κατηγορίες)
    icons.jsx                μικρά SVG εικονίδια
  hooks/
    useShoppingList.js       όλη η λογική (fetch, realtime, add/edit/delete, ιστορικό)
  components/
    Header.jsx
    AddForm.jsx
    Suggestions.jsx
    FrequentChips.jsx
    CategorySwatches.jsx
    ItemList.jsx
    ItemRow.jsx
    EditRow.jsx
    Summary.jsx
```

## Πρώτη εγκατάσταση

Χρειάζεσαι [Node.js](https://nodejs.org) (v18+) εγκατεστημένο.

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

## Αλλαγή κατηγοριών

Άνοιξε το `src/lib/categories.js` και πρόσθεσε/άλλαξε αντικείμενα στη μορφή:

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
