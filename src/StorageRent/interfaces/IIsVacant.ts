export interface IIsVacant {
    isVacant(rentDueDate: Date, leaseStartDate: Date): boolean;
}