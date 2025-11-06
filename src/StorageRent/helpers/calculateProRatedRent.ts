import { getLastDayOfMonth } from "./getLastDayOfMonth";

export function calculateProRatedRent(fullRent: number, leaseStartDate: Date, rentDueDate: Date): number {
  const totalDaysInMonth = getLastDayOfMonth(leaseStartDate.getFullYear(), leaseStartDate.getMonth());
  const daysUsed = totalDaysInMonth - leaseStartDate.getDate() + 1;
  return fullRent * (daysUsed / totalDaysInMonth);
}
