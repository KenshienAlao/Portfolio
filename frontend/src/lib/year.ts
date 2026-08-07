const CURRENT_YEAR = new Date().getFullYear();
export const YEARS = Array.from(
  { length: CURRENT_YEAR - 1980 + 1 },
  (_, i) => CURRENT_YEAR - i,
);

export function parseYears(years?: string) {
  const [start, end] = (years ?? "").split(/—|-/).map((s) => s.trim());
  return { start: start || "", end: end || "Present" };
}
