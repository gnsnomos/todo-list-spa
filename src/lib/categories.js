export const CATEGORIES = [
  { id: "meat", label: "Κρεοπωλείο", color: "#7C93B5" },
  { id: "produce", label: "Λαϊκή / Μανάβικο", color: "#E08A3C" },
  { id: "market", label: "Σουπερμάρκετ", color: "#D2A83E" },
  { id: "dairy", label: "Γαλακτοκομικά", color: "#7FB7C9" },
  { id: "bakery", label: "Αρτοποιείο", color: "#B47A4E" },
  { id: "fish", label: "Ιχθυοπωλείο", color: "#4E9C93" },
  { id: "pharmacy", label: "Φαρμακείο", color: "#C96B84" },
  { id: "other", label: "Λοιπά", color: "#9C9A87" },
];

export function catOf(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
