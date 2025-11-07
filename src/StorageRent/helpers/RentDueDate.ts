import { ILastDayOfMonth } from "../interfaces/ILastDayOfMonth";
import { IRentDueDate } from "../interfaces/IRentDueDate";

export class RentDueDate implements IRentDueDate {
  constructor(private readonly lastDayOfMonth: ILastDayOfMonth) {}

  getRentDueDate(year: number, month: number, dayOfMonthRentDue: number): Date {
    const lastDay = this.lastDayOfMonth.getLastDayOfMonth(year, month);
    const day = Math.min(dayOfMonthRentDue, lastDay);
    return new Date(year, month, day);
  }
}
