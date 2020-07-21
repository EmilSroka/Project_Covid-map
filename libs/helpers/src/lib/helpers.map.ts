import { Cases, Province } from '@covid-app/types';

export function getByID<T extends { id: string }>(
  targetID: string,
  array: T[]
): T {
  const areIDsEqual = ({ id }: T) => id === targetID;
  if (!array) return undefined;
  return array.find(areIDsEqual);
}

export function getMaxCases(cases: Cases[]): number {
  const getMax = (actualMax: number, { cases: actualCases }: Cases) =>
    actualCases > actualMax ? actualCases : actualMax;
  return cases.reduce(getMax, 0);
}

export function calculateColor(
  hue: number,
  id: string,
  max: number,
  cases: Cases[]
) {
  const casesInProvince = getByID<Cases>(id, cases)?.cases;

  if (noData(casesInProvince)) return 'black';

  const lightness = calculateLightness(casesInProvince, max);
  return `hsla(${Math.round(hue)},100%,${lightness}%,1)`;
}

function noData(casesInProvince: number) {
  return casesInProvince === -1 || casesInProvince == null;
}

function calculateLightness(value: number, maxValue: number): number {
  const normalizedValue = 1 - value / (maxValue || 1);
  return 50 + 50 * normalizedValue;
}

interface CoordinatesEvent {
  target: HTMLElement;
  clientX: number;
  clientY: number;
}

const tooltipOffset = 30;
export function calcTooltipState(
  { target, clientX, clientY }: CoordinatesEvent,
  provinces: Province[],
  cases: Cases[]
): [string, { x: number; y: number }, boolean] {
  if (!isProvince(target)) return ['', { x: 0, y: 0 }, false];

  const provinceID = (target as HTMLElement).getAttribute('id');
  const provinceName = getByID<Province>(provinceID, provinces)?.name;
  const provinceCases = getByID<Cases>(provinceID, cases)?.cases;
  const casesInfo = provinceCases === -1 ? 'no data' : provinceCases;

  return [
    `${provinceName}: ${casesInfo}`,
    {
      x: clientX,
      y: clientY + document.documentElement.scrollTop + tooltipOffset,
    },
    true,
  ];
}

export function calcTooltipStateFromMouseEvent(
  { target, clientX, clientY }: MouseEvent,
  provinces: Province[],
  cases: Cases[]
) {
  return calcTooltipState(
    { target: target as HTMLElement, clientX, clientY },
    provinces,
    cases
  );
}

export function calcTooltipStateFromFocusEvent(
  { target }: FocusEvent,
  provinces: Province[],
  cases: Cases[]
) {
  const targetElement = target as HTMLElement;
  const bounding = targetElement.getBoundingClientRect();
  const clientX = bounding.left + bounding.width / 2;
  const clientY = bounding.top + bounding.height / 2;

  return calcTooltipState(
    { target: targetElement, clientX, clientY },
    provinces,
    cases
  );
}

function isProvince(target: EventTarget): boolean {
  return (target as HTMLElement).tagName === 'path';
}

export function getProvinceDescription(
  id: string,
  provinces: Province[],
  cases: Cases[]
): string {
  const provinceName = getByID<Province>(id, provinces)?.name;
  const provinceCases = getByID<Cases>(id, cases)?.cases;

  const casesInfo = provinceCases === -1 ? 'no data' : `${provinceCases} cases`;
  return `${provinceName}: ${casesInfo}`;
}
