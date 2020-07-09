import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../../environments/environment';

import { Observable } from 'rxjs';

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
    return this.http.get(this.getApiUrl(date));
  }
}
