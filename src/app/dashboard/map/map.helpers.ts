import { ProvinceCases } from './map.types';

export function max(currentMax: number, { cases }: ProvinceCases): number {
  return currentMax < cases ? cases : currentMax;
}

export function byID(targetID): (ProvinceCases) => boolean {
  return ({ id }: ProvinceCases) => id === targetID;
}

export function calculateLightness(value: number, maxValue: number): number {
  const normalizedValue = 1 - value / maxValue;
  const exponentialValue = Math.exp(normalizedValue);
  return 50 + (50 * exponentialValue) / Math.exp(1);
}

export function getFirstValue(array: ProvinceCases[]): [number, number] {
  return [array[0].cases, array[0].cases];
}
