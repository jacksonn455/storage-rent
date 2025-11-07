import { IIsVacant } from "../interfaces/IIsVacant";

export class IsVacant implements IIsVacant {
  isVacant(rentDueDate: Date, leaseStartDate: Date): boolean {
    return rentDueDate < leaseStartDate;
  }
}
