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

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

export function arePositionsEqual(
  { x: x1, y: y1 }: Position,
  { x: x2, y: y2 }: Position
): boolean {
  return x1 === x2 && y1 === y2;
}
