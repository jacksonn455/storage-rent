export interface IShouldChangeRent {
  shouldChangeRent(
    monthIndex: number,
    rentRateChangeFrequency: number
  ): boolean;
}
