const dateRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
export function toDate(string: string): Date {
  const [, day, month, year] = string.match(dateRegex);
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function toString(date: Date): string {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
