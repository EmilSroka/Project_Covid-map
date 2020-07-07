import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { DailyCases } from '../types/data.types';

import { map, catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Injectable()
export class CasesService {
  public data: Array<string[] | number[]> | null = null;

  public x;

  constructor(private http: HttpClient) {}

  private getApiUrl(date: Date): string {
    return `http://localhost:7000/api/day/${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
  }

  getCases(date: Date): Observable<object> {
    return this.http.get(this.getApiUrl(date));
  }
}
