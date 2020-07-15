import { Injectable, HttpService } from '@nestjs/common';
import {
  DailyCases,
  Cases,
  Provinces,
  CasesInInterval,
} from '@covid-app/types';
import { byDate, EmptyDay, EmptyInterval } from '../helpers/data.helpers';
import { map } from 'rxjs/operators';
import { Scraper } from './scraper.helpers';
import { getDaysInInterval } from '../helpers/date.helpers';

@Injectable()
export class DataService {
  private data: DailyCases[];
  private readonly noCasesString = '–';

  constructor(private httpService: HttpService) {}

  public async getByDate(day: Date): Promise<DailyCases> {
    if (!this.data) {
      this.data = await this.fetchData();
    }

    return this.getDailyCases(day);
  }

  public async getByInterval(
    start: Date,
    stop: Date
  ): Promise<CasesInInterval> {
    if (!this.data) {
      this.data = await this.fetchData();
    }

    return this.getIntervalCases(start, stop);
  }

  private getDailyCases(date: Date): DailyCases {
    const result = this.data.find(byDate(date));
    return result ? result : new EmptyDay(date);
  }

  private getIntervalCases(start: Date, stop: Date): CasesInInterval {
    const interval = getDaysInInterval(start, stop, this.data);

    if (interval.length === 0) {
      return new EmptyInterval(start, stop, -1);
    } else {
      return interval.reduce((accumulator, { cases }) => {
        for (let i = 0; i < accumulator.cases.length; i++) {
          accumulator.cases[i].cases += cases[i].cases;
        }
        return accumulator;
      }, new EmptyInterval(start, stop, 0));
    }
  }

  private fetchData() {
    return this.httpService
      .get(process.env.API, { responseType: 'text' })
      .pipe(
        map(({ data }) => new Scraper(data).do()),
        map((data) => this.format(data))
      )
      .toPromise();
  }

  private format([dates, tabularData]: [Date[], string[][]]): DailyCases[] {
    const data: DailyCases[] = [];
    for (let i = 0; i < dates.length; i++) {
      const cases: Cases[] = [];
      for (let j = 0; j < tabularData[i].length; j++) {
        cases.push({
          id: Provinces[j],
          cases:
            tabularData[i][j] === this.noCasesString
              ? 0
              : Number(tabularData[i][j]),
        });
      }
      data.push({ date: dates[i], cases });
    }
    return data;
  }
}
