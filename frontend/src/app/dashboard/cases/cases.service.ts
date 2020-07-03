import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProvinceCases } from '../map/map.types';

import { map, catchError } from 'rxjs/operators';

import { Observable } from 'rxjs';

const configUrl = 'https://pl.wikipedia.org/wiki/Pandemia_COVID-19_w_Polsce';
const tableRegex = /<table class="wikitable mw-collapsible".*?<\/table>/s;
const provinceRegex = /(?<=title=").*?(?=")/g;
// TODO // Origin: https://foo.example

@Injectable()
export class CasesService {
  public data: Array<string[] | number[]> | null = null;

  public x;

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    this.http
      .get(configUrl, { responseType: 'text' })
      //.pipe(map((x) => console.log(x)))
      .pipe(map(this.scraping))
      .subscribe((x) => ((this.x = x), console.log(x)));
  }

  scraping(rawData) {
    const table = rawData.match(tableRegex)[0];
    const rows = table.split('<tr>');
    const provinces = getProvinces(rows[3]);
    const withoutSummary = rows.slice(4, -3);

    //console.log(provinces);
    processData(withoutSummary);

    console.log(withoutSummary[0]);
    return 'xD';
  }

  getCases(): ProvinceCases[] {
    // console.log(this.x);

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

function getProvinces(data: string): string[] {
  return data.match(provinceRegex);
}

function processData(data) {
  const result = [];
  for (let key = 0; key <= data.length; key++) {
    result.push(new Array(17));
  }

  for (let [lineIndexString, line] of Object.entries(data)) {
    console.log(`Line: ${lineIndexString}`);
    const lineIndex = Number(lineIndexString);
    let cells = (line as String).split('<td');
    for (let [indexString, cell] of Object.entries(cells)) {
      let index = Number(indexString);
      if ((index > 0 && index < 4) || index === cells.length - 1) {
        continue;
      }

      if (index === 0) {
        const [date] = cell.match(/\d\d\.\d\d/);
        result[lineIndex][0] = date;
      } else if (index >= 4 && index < cells.length - 1) {
        index -= 3;
        while (result[lineIndex][index]) {
          index += 1;
        }

        console.log(`!!!: ${indexString} -> ${index}`);

        const [value] = cell.match(/(?<=>).*?(?=<)/s)[0];
        result[lineIndex][index] = value;
        const rowspan = cell.match(/(?<=rowspan=").*?(?=")/s);

        if (rowspan) {
          const rowspanLength = Number(rowspan[0]);
          for (let i = 1; i < rowspanLength; i++) {
            result[lineIndex + i][index] = value;
          }
        }
      }
    }
  }

  console.log(result);
}
