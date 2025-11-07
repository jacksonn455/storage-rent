import { getLastDayOfMonth } from "./getLastDayOfMonth";

export function calculateProRatedRent(
  fullRent: number,
  leaseStartDate: Date,
  rentDueDate: Date
): number {
  const daysUsed = rentDueDate.getDate() - leaseStartDate.getDate();
  return fullRent * (daysUsed / 30);
}
