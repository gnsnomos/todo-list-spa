export const CATEGORIES = [
  { id: "market", label: "Σουπερμάρκετ", color: "#D2A83E" },
  { id: "meat", label: "Κρεοπωλείο", color: "#7C93B5" },
  { id: "produce", label: "Λαϊκή", color: "#E08A3C" },
  { id: "pharmacy", label: "Φαρμακείο", color: "#C96B84" },
  { id: "other", label: "Λοιπά", color: "#9C9A87" },
];

export function catOf(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
