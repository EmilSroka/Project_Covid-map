import { ProvinceCases } from './map.types';

export function minmax(
  [currentMin, currentMax]: [number, number],
  { cases }: ProvinceCases
): [number, number] {
  return [
    currentMin > cases ? cases : currentMin,
    currentMax < cases ? cases : currentMax,
  ];
}

export function byID(targetID): (ProvinceCases) => boolean {
  return ({ id }: ProvinceCases) => id === targetID;
}

export function calculateLightness(
  value: number,
  min: number,
  max: number
): number {
  const normalizedValue = 1 - (value - min) / (max - min);
  const exponentialValue = Math.exp(normalizedValue);
  return 50 + (50 * exponentialValue) / Math.exp(1);
}

export function getFirstValue(array: ProvinceCases[]): [number, number] {
  return [array[0].cases, array[0].cases];
}
