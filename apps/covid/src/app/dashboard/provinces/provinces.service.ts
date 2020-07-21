import { Injectable } from '@angular/core';
import { Province } from '@covid-app/types';
import { PROVINCES } from '@covid-app/consts';
import { Observable, of } from 'rxjs';

@Injectable()
export class ProvincesService {
  constructor() {}

  getProvinces(): Observable<Province[]> {
    return of(PROVINCES);
  }
}
