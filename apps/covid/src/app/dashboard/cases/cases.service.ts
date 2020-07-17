import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { dateToDateString } from '@covid-app/helpers';

import { Observable, of } from 'rxjs';
import { catchError, pluck } from 'rxjs/operators';
import { Cases, CasesInInterval, DailyCases } from '@covid-app/types';
import { FALLBACK_CASES } from '@covid-app/consts';

@Injectable()
export class CasesService {
  public data: Array<string[] | number[]> | null = null;

  constructor(private http: HttpClient) {}

  public getCasesByDay(date: Date): Observable<Cases[]> {
    return this.http.get<DailyCases>(this.getApiDayUrl(date)).pipe(
      pluck('cases'),
      catchError(() => {
        throw FALLBACK_CASES;
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
          throw FALLBACK_CASES;
        })
      );
  }

  private getApiIntervalUrl(start: Date, stop: Date): string {
    return `${environment.api}/interval/${dateToDateString(
      start
    )}/${dateToDateString(stop)}/`;
  }
}
