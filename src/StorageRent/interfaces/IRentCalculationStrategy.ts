export interface IRentCalculationStrategy {
  calculateProRatedRent(
    fullRent: number,
    leaseStartDate: Date,
    rentDueDate: Date
  ): number;
}
