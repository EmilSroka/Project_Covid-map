import { Cases } from '../types/data.types';

export function max(currentMax: number, { cases }: Cases): number {
  return currentMax < cases ? cases : currentMax;
}

export function byID(targetID): (Cases) => boolean {
  return ({ id }: Cases) => id === targetID;
}

export function calculateLightness(value: number, maxValue: number): number {
  const normalizedValue = 1 - value / maxValue;
  return 50 + 50 * normalizedValue;
}
