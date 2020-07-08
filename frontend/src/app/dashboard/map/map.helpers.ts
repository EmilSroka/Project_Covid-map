import { Cases, Position, Province } from '../types/data.types';

export function max(currentMax: number, { cases }: Cases): number {
  return currentMax < cases ? cases : currentMax;
}

export function byID(targetID): (objectToCheck: Cases | Province) => boolean {
  return ({ id }: Cases | Province) => id === targetID;
}

export function calculateLightness(value: number, maxValue: number): number {
  const normalizedValue = 1 - value / (maxValue || 1);
  return 50 + 50 * normalizedValue;
}

export function noDataForThisDay(value: number): boolean {
  return value === -1;
}

const tooltipOffset = 30;
export function calculateTooltipData(
  event: MouseEvent,
  provinces: Province[],
  cases: Cases[],
  mousePosition: Position
): [string, Position] {
  const provinceID = (event.target as HTMLInputElement).getAttribute('id');
  const provinceName = provinces.find(byID(provinceID))?.name;
  const provinceCases = cases.find(byID(provinceID))?.cases;
  const casesInfo = provinceCases === -1 ? 'no data' : provinceCases;

  return [
    `${provinceName}: ${casesInfo}`,
    {
      x: mousePosition.x,
      y: mousePosition.y + document.documentElement.scrollTop + tooltipOffset,
    },
  ];
}
