import { IRentCalculationStrategy } from "../interfaces/IRentCalculationStrategy";

export class ProRatedRent implements IRentCalculationStrategy {
  calculateProRatedRent(fullRent: number, leaseStartDate: Date, rentDueDate: Date): number {
    return fullRent * (rentDueDate.getDate() - leaseStartDate.getDate()) / 30.0;
  }
}