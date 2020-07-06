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
  return new Date(Number(year), Number(month) - 1, Number(day));
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0;
}

function inRange(value, min, max): boolean {
  return value >= min && value <= max;
}
