export function getNextMonthDate(date: Date): Date {
  const nextMonth = new Date(date);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  nextMonth.setDate(1);
  return nextMonth;
}
