import { getLastDayOfMonth } from "./getLastDayOfMonth";

export function getRentDueDate(
  year: number,
  month: number,
  dayOfMonthRentDue: number
): Date {
  const lastDay = getLastDayOfMonth(year, month);
  const day = Math.min(dayOfMonthRentDue, lastDay);
  return new Date(year, month, day);
}
