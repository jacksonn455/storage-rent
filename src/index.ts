import { calculateMonthlyRent } from "./StorageRent/StorageRent";

const baseMonthlyRent = 1000;
const leaseStartDate = new Date("2024-01-15");
const windowStartDate = new Date("2024-01-01");
const windowEndDate = new Date("2024-06-30");
const dayOfMonthRentDue = 10;
const rentRateChangeFrequency = 3;
const rentChangeRate = 0.05;

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
