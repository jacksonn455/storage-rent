import { calculateMonthlyRent } from "./StorageRent/StorageRent";

const baseMonthlyRent = 100.0;
const leaseStartDate = new Date("2023-02-01T00:00:00");
const windowStartDate = new Date("2023-01-01T00:00:00");
const windowEndDate = new Date("2023-03-31T00:00:00");
const dayOfMonthRentDue = 1;
const rentRateChangeFrequency = 1;
const rentChangeRate = 0.1;

const monthlyRentRecords = calculateMonthlyRent(
  baseMonthlyRent,
  leaseStartDate,
  windowStartDate,
  windowEndDate,
  dayOfMonthRentDue,
  rentRateChangeFrequency,
  rentChangeRate
);

console.log(monthlyRentRecords);
