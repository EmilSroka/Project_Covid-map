const dateStringRegex = /^(\d{1,2})-(\d{1,2})-(\d{4})$/;
const formStringRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

export function dateStringToDisplayString(date: string): string {
  const [, day, month, year] = date.match(dateStringRegex);
  const monthAsString = String(month).padStart(2, '0');
  const dayAsString = String(day).padStart(2, '0');
  return `${monthAsString}/${dayAsString}/${year}`;
}

export function dateStringToFormString(date: string): string {
  const [, day, month, year] = date.match(dateStringRegex);
  const monthAsString = String(month).padStart(2, '0');
  const dayAsString = String(day).padStart(2, '0');
  return `${year}-${monthAsString}-${dayAsString}`;
}

export function formStringToDateString(date: string): string {
  const [, year, month, day] = date.match(formStringRegex);
  const monthAsString = String(month).padStart(2, '0');
  const dayAsString = String(day).padStart(2, '0');
  return `${dayAsString}-${monthAsString}-${year}`;
}

export function dateStringToDate(date: string): Date {
  const [, day, month, year] = date.match(dateStringRegex);
  return new Date(Number(year), Number(month) - 1, Number(day));
}

export function dateToDateString(date: Date): string {
  const monthAsString = String(date.getMonth() + 1).padStart(2, '0');
  const dayAsString = String(date.getDate()).padStart(2, '0');
  return `${dayAsString}-${monthAsString}-${date.getFullYear()}`;
}

export function increaseDateString(date: string, days = 1) {
  const asDate = dateStringToDate(date);
  asDate.setDate(asDate.getDate() + days);
  return dateToDateString(asDate);
}
