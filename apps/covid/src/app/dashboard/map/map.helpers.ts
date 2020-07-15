import { Cases, Province } from '@covid-app/types';

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
  return value == null || value === -1;
}

export function isProvince(target: EventTarget): boolean {
  return (target as HTMLElement).tagName === 'path';
}
