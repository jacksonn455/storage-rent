import { RentDueDate } from "./helpers/RentDueDate";
import { ProRatedRent } from "./helpers/ProRatedRent";
import { RentChange } from "./helpers/RentChange";
import { FormatCurrency } from "./helpers/FormatCurrency";
import { NextMonthDate } from "./helpers/NextMonthDate";
import { LastDayOfMonth } from "./helpers/LastDayOfMonth";

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
  const rentDueDateHelper = new RentDueDate(new LastDayOfMonth());
  const monthlyRentRecords: MonthlyRentRecords = [];

  let currentRent = baseMonthlyRent;
  let monthIndex = 0;

  if (
    leaseStartDate.getDate() < dayOfMonthRentDue &&
    leaseStartDate >= windowStartDate
  ) {
    const firstRentDueDate = rentDueDateHelper.getRentDueDate(
      leaseStartDate.getFullYear(),
      leaseStartDate.getMonth(),
      dayOfMonthRentDue
    );
    const proRatedAmount = new ProRatedRent().calculateProRatedRent(
      currentRent,
      leaseStartDate,
      firstRentDueDate
    );

    monthlyRentRecords.push({
      vacancy: false,
      rentAmount: new FormatCurrency().getformatCurrency(proRatedAmount),
      rentDueDate: new Date(leaseStartDate),
    });

    monthIndex++;
  }

  let currentDate = new Date(windowStartDate);

  while (currentDate <= windowEndDate) {
    const rentDueDate = rentDueDateHelper.getRentDueDate(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      dayOfMonthRentDue
    );

    if (rentDueDate < windowStartDate) {
      currentDate = new NextMonthDate().getNextMonthDate(currentDate);
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
      currentRent = new RentChange().calculateRentChange(
        currentRent,
        monthsSinceLeaseStart,
        rentRateChangeFrequency,
        rentChangeRate,
        vacancy
      );
    }

    const rentAmount = new FormatCurrency().getformatCurrency(currentRent);

    monthlyRentRecords.push({
      vacancy,
      rentAmount,
      rentDueDate,
    });

    currentDate = new NextMonthDate().getNextMonthDate(currentDate);
    monthIndex++;
  }

  return monthlyRentRecords;
}
