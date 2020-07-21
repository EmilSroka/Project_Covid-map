import { async, TestBed } from '@angular/core/testing';
import { CasesService } from './cases.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

const numberOfProvinces = 16;

describe('Cases service', () => {
  let casesService: CasesService;
  let httpTestingControler: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CasesService],
    }).compileComponents();
  }));

  beforeEach(() => {
    casesService = TestBed.inject(CasesService);
    httpTestingControler = TestBed.inject(HttpTestingController);
  });

  it('function getCasesByDay should return array of Cases objects', () => {
    casesService.getCasesByDay(new Date(2020, 4, 15)).subscribe((data) => {
      expect(data.length).toBe(numberOfProvinces);
      for (const { id, cases } of data) {
        expect(id).toEqual(jasmine.any(String));
        expect(cases).toEqual(jasmine.any(Number));
      }
    });

    const req = httpTestingControler.expectOne(
      `${environment.api}/day/15-05-2020/`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dataFromDayEndPoint);
  });

  it('function getCasesByDay should provide fallback on request failure', () => {
    casesService.getCasesByDay(new Date(2020, 4, 15)).subscribe({
      error: (data) => {
        expect(data.length).toBe(16);
        for (const { id, cases } of data) {
          expect(id).toEqual(jasmine.any(String));
          expect(cases).toEqual(-1);
        }
      },
    });

    httpTestingControler
      .expectOne(`${environment.api}/day/15-05-2020/`)
      .error(new ErrorEvent('network error'));
  });

  it('function getCasesByInterval should return array of Cases objects', () => {
    casesService
      .getCasesByInterval(new Date(2020, 4, 15), new Date(2020, 5, 15))
      .subscribe((data) => {
        expect(data.length).toBe(numberOfProvinces);
        for (const { id, cases } of data) {
          expect(id).toEqual(jasmine.any(String));
          expect(cases).toEqual(jasmine.any(Number));
        }
      });

    const req = httpTestingControler.expectOne(
      `${environment.api}/interval/15-05-2020/15-06-2020/`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dataFromIntervalEndPoint);
  });

  it('function getCasesByInterval should provide fallback on request failure', () => {
    casesService
      .getCasesByInterval(new Date(2020, 4, 15), new Date(2020, 5, 15))
      .subscribe({
        error: (data) => {
          expect(data.length).toBe(16);
          for (const { id, cases } of data) {
            expect(id).toEqual(jasmine.any(String));
            expect(cases).toEqual(-1);
          }
        },
      });

    httpTestingControler
      .expectOne(`${environment.api}/interval/15-05-2020/15-06-2020/`)
      .error(new ErrorEvent('network error'));
  });
});

const dataFromDayEndPoint = {
  date: '2020-03-15T01:00:00.000Z',
  cases: [
    { id: 'PL-DS', cases: 2 },
    { id: 'PL-KP', cases: 0 },
    { id: 'PL-LU', cases: 2 },
    { id: 'PL-LB', cases: 1 },
    { id: 'PL-LD', cases: 4 },
    { id: 'PL-MA', cases: 0 },
    { id: 'PL-MZ', cases: 6 },
    { id: 'PL-OP', cases: 0 },
    { id: 'PL-PK', cases: 1 },
    { id: 'PL-PD', cases: 0 },
    { id: 'PL-PM', cases: 0 },
    { id: 'PL-SL', cases: 2 },
    { id: 'PL-SK', cases: 1 },
    { id: 'PL-WN', cases: 1 },
    { id: 'PL-WP', cases: 0 },
    { id: 'PL-ZP', cases: 1 },
  ],
};

const dataFromIntervalEndPoint = {
  start: '2020-03-15T01:00:00.000Z',
  stop: '2020-03-20T01:00:00.000Z',
  cases: [
    { id: 'PL-DS', cases: 45 },
    { id: 'PL-KP', cases: 14 },
    { id: 'PL-LU', cases: 13 },
    { id: 'PL-LB', cases: 8 },
    { id: 'PL-LD', cases: 42 },
    { id: 'PL-MA', cases: 13 },
    { id: 'PL-MZ', cases: 91 },
    { id: 'PL-OP', cases: 6 },
    { id: 'PL-PK', cases: 12 },
    { id: 'PL-PD', cases: 3 },
    { id: 'PL-PM', cases: 8 },
    { id: 'PL-SL', cases: 34 },
    { id: 'PL-SK', cases: 4 },
    { id: 'PL-WN', cases: 13 },
    { id: 'PL-WP', cases: 11 },
    { id: 'PL-ZP', cases: 4 },
  ],
};
