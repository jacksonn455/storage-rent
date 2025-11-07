export interface IRentChange {
  calculateRentChange(
    currentRent: number,
    monthsSinceStart: number,
    rentChangeFrequency: number,
    rentChangeRate: number,
    isVacant: boolean
  ): number;
}
