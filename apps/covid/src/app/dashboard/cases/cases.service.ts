import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { dateToDateString } from '@covid-app/helpers';

import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { Cases, CasesInInterval, DailyCases } from '@covid-app/types';

@Injectable()
export class CasesService {
  public data: Array<string[] | number[]> | null = null;

  constructor(private http: HttpClient) {}

  public getCasesByDay(date: Date): Observable<Cases[]> {
    return this.http.get<DailyCases>(this.getApiDayUrl(date)).pipe(
      pluck('cases'),
      catchError(() => {
        throw createFallback();
      })
    );
  }

  private getApiDayUrl(date: Date): string {
    return `${environment.api}/day/${dateToDateString(date)}/`;
  }

  public getCasesByInterval(start: Date, stop: Date): Observable<Cases[]> {
    return this.http
      .get<CasesInInterval>(this.getApiIntervalUrl(start, stop))
      .pipe(
        pluck('cases'),
        catchError(() => {
          throw createFallback();
        })
      );
  }

  private getApiIntervalUrl(start: Date, stop: Date): string {
    return `${environment.api}/interval/${dateToDateString(
      start
    )}/${dateToDateString(stop)}/`;
  }
}

function createFallback(): Cases[] {
  return [
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
  ];
}
