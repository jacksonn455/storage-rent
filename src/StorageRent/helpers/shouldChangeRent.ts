import { IShouldChangeRent } from "../interfaces/IShouldChangeRent";

export class ShouldChangeRent implements IShouldChangeRent {
  shouldChangeRent(
    monthIndex: number,
    rentRateChangeFrequency: number
  ): boolean {
    return monthIndex > 0 && monthIndex % rentRateChangeFrequency === 0;
  }
}
