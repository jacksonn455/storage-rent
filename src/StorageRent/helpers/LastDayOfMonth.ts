import { ILastDayOfMonth } from "../interfaces/ILastDayOfMonth";

export class LastDayOfMonth implements ILastDayOfMonth {
  getLastDayOfMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
}
