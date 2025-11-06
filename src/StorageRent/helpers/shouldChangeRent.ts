export function shouldChangeRent(monthIndex: number, rentRateChangeFrequency: number): boolean {
  return monthIndex > 0 && monthIndex % rentRateChangeFrequency === 0;
}
