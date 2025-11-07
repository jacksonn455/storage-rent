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
  let monthIndex = 0;

  if (
    leaseStartDate.getDate() < dayOfMonthRentDue &&
    leaseStartDate >= windowStartDate
  ) {
    const firstRentDueDate = getRentDueDate(
      leaseStartDate.getFullYear(),
      leaseStartDate.getMonth(),
      dayOfMonthRentDue
    );

    const proRatedAmount = calculateProRatedRent(
      currentRent,
      leaseStartDate,
      firstRentDueDate
    );

    monthlyRentRecords.push({
      vacancy: false,
      rentAmount: formatCurrency(proRatedAmount),
      rentDueDate: new Date(leaseStartDate),
    });

    monthIndex++;
  }

  let currentDate = new Date(windowStartDate);

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

    const rentAmount = formatCurrency(currentRent);

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
