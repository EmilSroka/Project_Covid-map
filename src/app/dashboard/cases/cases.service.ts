import { Injectable } from '@angular/core';
import { ProvinceCases } from '../map/map.types';

@Injectable()
export class CasesService {
  constructor() {}

  getCases(): ProvinceCases[] {
    return [
      {
        id: 'PL-DS',
        cases: 34,
      },
      {
        id: 'PL-KP',
        cases: 18,
      },
      {
        id: 'PL-LD',
        cases: 22,
      },
      {
        id: 'PL-LU',
        cases: 13,
      },
      {
        id: 'PL-LB',
        cases: 44,
      },
      {
        id: 'PL-MA',
        cases: 15,
      },
      {
        id: 'PL-MZ',
        cases: 46,
      },
      {
        id: 'PL-OP',
        cases: 20,
      },
      {
        id: 'PL-PK',
        cases: 13,
      },
      {
        id: 'PL-PD',
        cases: 45,
      },
      {
        id: 'PL-PM',
        cases: 22,
      },
      {
        id: 'PL-SL',
        cases: 120,
      },
      {
        id: 'PL-SK',
        cases: 22,
      },
      {
        id: 'PL-WN',
        cases: 33,
      },
      {
        id: 'PL-WP',
        cases: 21,
      },
      {
        id: 'PL-ZP',
        cases: 37,
      },
    ];
  }
}
