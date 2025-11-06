import { getRentDueDate } from "./helpers/getRentDueDate";
import { calculateProRatedRent } from "./helpers/calculateProRatedRent";
import { calculateRentChange } from "./helpers/calculateRentChange";
import { formatCurrency } from "./helpers/formatCurrency";
import { getNextMonthDate } from "./helpers/getNextMonthDate";

export type MonthlyRentRecord = {
  vacancy: boolean;
  rentAmount: number;
  rentDueDate: Date;
};

export type MonthlyRentRecords = Array<MonthlyRentRecord>;

/**
 * Determines the vacancy, rent amount and due date for each month in a given time window
 *
 * @param baseMonthlyRent : The base or starting monthly rent for unit (Number)
 * @param leaseStartDate : The date that the tenant's lease starts (Date)
 * @param windowStartDate : The first date of the given time window (Date)
 * @param windowEndDate : The last date of the given time window (Date)
 * @param dayOfMonthRentDue : The day of each month on which rent is due (Number)
 * @param rentRateChangeFrequency : The frequency in months the rent is changed (Number)
 * @param rentChangeRate : The rate to increase or decrease rent, input as decimal (not %), positive for increase, negative for decrease (Number),
 * @returns Array<MonthlyRentRecord>;
 */

export function calculateMonthlyRent(
  baseMonthlyRent: number,
  leaseStartDate: Date,
  windowStartDate: Date,
  windowEndDate: Date,
  dayOfMonthRentDue: number,
  rentRateChangeFrequency: number,
  rentChangeRate: number
) {
  const monthlyRentRecords: MonthlyRentRecords = [];

  let currentRent = baseMonthlyRent;
  let currentDate = new Date(windowStartDate);
  let monthIndex = 0;

  while (currentDate <= windowEndDate) {
    const rentDueDate = getRentDueDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayOfMonthRentDue
    );

    if (rentDueDate < windowStartDate) {
      currentDate = getNextMonthDate(currentDate);
      continue;
    }

    if (rentDueDate > windowEndDate) break;

    const vacancy = rentDueDate < leaseStartDate;

    const monthsSinceLeaseStart =
      (rentDueDate.getFullYear() - leaseStartDate.getFullYear()) * 12 +
      (rentDueDate.getMonth() - leaseStartDate.getMonth());

    if (
      !vacancy &&
      monthsSinceLeaseStart >= 0 &&
      monthsSinceLeaseStart % rentRateChangeFrequency === 0 &&
      monthIndex > 0
    ) {
      currentRent = calculateRentChange(
        currentRent,
        monthsSinceLeaseStart,
        rentRateChangeFrequency,
        rentChangeRate,
        vacancy
      );
    }

    let rentAmount = currentRent;
    if (
      !vacancy &&
      rentDueDate.getMonth() === leaseStartDate.getMonth() &&
      rentDueDate.getFullYear() === leaseStartDate.getFullYear()
    ) {
      rentAmount = calculateProRatedRent(
        currentRent,
        leaseStartDate,
        rentDueDate
      );
    }

    rentAmount = formatCurrency(rentAmount);

    monthlyRentRecords.push({
      vacancy,
      rentAmount,
      rentDueDate,
    });

    currentDate = getNextMonthDate(currentDate);
    monthIndex++;
  }

  return monthlyRentRecords;
}
