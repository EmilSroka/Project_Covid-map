import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CasesService {
  public data: Array<string[] | number[]> | null = null;

  public x;

  constructor(private http: HttpClient) {}

  private getApiUrl(date: Date): string {
    return `${environment.api}/day/${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  }

  getCases(date: Date): Observable<object> {
    return this.http.get(this.getApiUrl(date)).pipe(
      catchError(() => {
        throw createFallback(date);
      })
    );
  }
}

function createFallback(date: Date) {
  return {
    date: date.toDateString(),
    cases: [
      { id: 'PL-DS', cases: -1 },
      { id: 'PL-KP', cases: -1 },
      { id: 'PL-LU', cases: -1 },
      { id: 'PL-LB', cases: -1 },
      { id: 'PL-LD', cases: -1 },
      { id: 'PL-MA', cases: -1 },
      { id: 'PL-MZ', cases: -1 },
      { id: 'PL-OP', cases: -1 },
      { id: 'PL-PK', cases: -1 },
      { id: 'PL-PD', cases: -1 },
      { id: 'PL-PM', cases: -1 },
      { id: 'PL-SL', cases: -1 },
      { id: 'PL-SK', cases: -1 },
      { id: 'PL-WN', cases: -1 },
      { id: 'PL-WP', cases: -1 },
      { id: 'PL-ZP', cases: -1 },
    ],
  };
}
