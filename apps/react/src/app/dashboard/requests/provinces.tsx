import { Cases } from '@covid-app/types';
import { environment } from '../../../environments/environment';
import { FALLBACK_CASES } from '@covid-app/consts';

export function getProvinces(
  date: string,
  startDate: string,
  endDate: string
): Promise<Cases[]> {
  if (date) {
    return fetch(`${environment.api}/day/${date}`)
      .then((response) => response.json())
      .then(({ cases }) => cases)
      .catch(() => {
        throw FALLBACK_CASES;
      });
  } else {
    return fetch(`${environment.api}/interval/${startDate}/${endDate}`)
      .then((response) => response.json())
      .then(({ cases }) => cases)
      .catch(() => {
        throw FALLBACK_CASES;
      });
  }
}
