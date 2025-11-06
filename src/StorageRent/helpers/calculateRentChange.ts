export function calculateRentChange(
  currentRent: number,
  monthsSinceStart: number,
  rentChangeFrequency: number,
  rentChangeRate: number,
  isVacant: boolean
): number {
  const shouldChange = monthsSinceStart > 0 && monthsSinceStart % rentChangeFrequency === 0;

  if (!shouldChange) return currentRent;

  if (isVacant && rentChangeRate > 0) return currentRent; // não aumenta se está vago
  if (!isVacant && rentChangeRate < 0) return currentRent; // não diminui se está ocupado

  const adjusted = currentRent * (1 + rentChangeRate);
  return Math.round(adjusted * 100) / 100; // arredonda para 2 casas decimais
}
