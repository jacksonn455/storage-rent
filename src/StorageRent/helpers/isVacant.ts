export function isVacant(rentDueDate: Date, leaseStartDate: Date): boolean {
  return rentDueDate < leaseStartDate;
}
