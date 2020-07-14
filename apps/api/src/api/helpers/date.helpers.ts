import { DailyCases } from '@covid-app/types';
import { byDate } from '../data/data.helpers';

const dateRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;

const monthsWith30Days = [4, 6, 9, 11];
const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

export class DateValidator {
  constructor(private date: string) {}

  isValid(): boolean {
    if (!dateRegex.test(this.date)) return false;

    const [, day, month, year] = this.date.match(dateRegex);

    if (!this.isMonthCorrect(month)) return false;
    if (!this.isDayCorrect(day, month, year)) return false;

    return true;
  }

  private isMonthCorrect(month: string): boolean {
    const asNumber = Number(month);
    return asNumber > 0 && asNumber < 13;
  }

  private isDayCorrect(day: string, month: string, year: string): boolean {
    const monthAsNumber = Number(month);
    const dayAsNumber = Number(day);
    const yearAsNumber = Number(year);

    if (
      monthsWith30Days.includes(monthAsNumber) &&
      !inRange(dayAsNumber, 1, 30)
    ) {
      return false;
    }

    if (
      monthsWith31Days.includes(monthAsNumber) &&
      !inRange(dayAsNumber, 1, 31)
    ) {
      return false;
    }

    if (monthAsNumber === 2) {
      if (isLeapYear(yearAsNumber)) {
        if (!inRange(dayAsNumber, 1, 29)) return false;
      } else {
        if (!inRange(dayAsNumber, 1, 28)) return false;
      }
    }

    return true;
  }
}

export function convertToDate(date: string) {
  const [, day, month, year] = date.match(dateRegex);
  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(process.env.TIMEZONE)
  );
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0;
}

function inRange(value, min, max): boolean {
  return value >= min && value <= max;
}

export function getDaysInInterval(
  start: Date,
  stop: Date,
  days: DailyCases[]
): DailyCases[] {
  if (!intersects(start, stop, days)) {
    return [];
  }

  const startIndex = days.findIndex(byDate(start));
  const stopIndex = days.findIndex(byDate(stop));

  return days.slice(
    startIndex === -1 ? 0 : startIndex,
    stopIndex === -1 ? days.length : stopIndex + 1
  );
}

function intersects(start: Date, stop: Date, days: DailyCases[]): boolean {
  const firstDay = days[0].date;
  const lastDay = days[days.length - 1].date;

  return !(
    firstDay.getTime() - stop.getTime() > 0 ||
    start.getTime() - lastDay.getTime() > 0
  );

  // return (
  //   start.getTime() - firstDay.getTime() > 0 ||
  //   lastDay.getTime() - stop.getTime() > 0
  // );

  // return firstDay.getTime() - stop.getTime() > 0 ||
  // start.getTime() - lastDay.getTime() > 0
}
