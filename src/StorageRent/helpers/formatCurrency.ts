export function formatCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
