import { Injectable, HttpService } from '@nestjs/common';
import { DailyCases, Cases, Provinces } from '../types/data.types';
import { byDate, EmptyDay } from './data.helpers';
import { map } from 'rxjs/operators';
import { Scraper } from './scraper.helpers';

@Injectable()
export class DataService {
  private data: DailyCases[];
  private readonly noCasesString = '–';

  constructor(private httpService: HttpService) {}

  public async get(day: Date): Promise<DailyCases> {
    if (!this.data) {
      this.data = await this.fetchData();
    }

    return this.getDailyCases(day);
  }

  private getDailyCases(date: Date): DailyCases {
    const result = this.data.find(byDate(date));
    return result ? result : new EmptyDay(date);
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
