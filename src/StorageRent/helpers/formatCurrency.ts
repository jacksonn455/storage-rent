import { IFormatCurrency } from "../interfaces/IFormatCurrency";

export class FormatCurrency implements IFormatCurrency {
  getformatCurrency(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
