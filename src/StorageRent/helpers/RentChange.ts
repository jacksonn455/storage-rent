import { IRentChange } from "../interfaces/IRentChange";

export class RentChange implements IRentChange {
  calculateRentChange(
    currentRent: number,
    monthsSinceStart: number,
    rentChangeFrequency: number,
    rentChangeRate: number,
    isVacant: boolean
  ): number {
    const shouldChange =
      monthsSinceStart > 0 && monthsSinceStart % rentChangeFrequency === 0;

    if (!shouldChange) return currentRent;

    if (isVacant && rentChangeRate > 0) return currentRent;
    if (!isVacant && rentChangeRate < 0) return currentRent;

    const adjusted = currentRent * (1 + rentChangeRate);
    return Math.round(adjusted * 100) / 100;
  }
}
