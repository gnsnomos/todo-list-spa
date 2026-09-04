export default function Header({ syncState }) {
  const label =
    syncState === "error" ? "Σφάλμα σύνδεσης" : syncState === "busy" ? "Αποθήκευση..." : "Συγχρονισμένο";
  const dotClass = "sl-sync-dot " + (syncState === "error" ? "off" : syncState === "busy" ? "busy" : "");

  return (
    <div className="sl-header">
      <div>
        <h1 className="sl-title">🧺 Ψώνια σπιτιού</h1>
        <p className="sl-sub">Πάτα σε ένα είδος όταν το αγοράσεις</p>
      </div>
      <div className="sl-sync">
        <span className={dotClass}></span>
        {label}
      </div>
    </div>
  );
}
