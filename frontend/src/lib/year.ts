export function getYears(startYear = 1980): number[] {
  const currentYear = new Date().getFullYear();
  return Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i,
  );
}
