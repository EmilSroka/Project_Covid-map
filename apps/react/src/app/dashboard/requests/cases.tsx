import { Province } from '@covid-app/types';
import { PROVINCES } from '@covid-app/consts';

export function getCases(): Promise<Province[]> {
  return new Promise((resolve) => resolve(PROVINCES));
}
