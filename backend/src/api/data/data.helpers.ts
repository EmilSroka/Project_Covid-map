import { DailyCases, Cases, Provinces } from '../../../../common/data.types';

export function byDate(expected: Date): (Date) => boolean {
  return ({ date }) => date.getTime() === expected.getTime();
}

const numberOfProvinces = 16;
export class EmptyDay implements DailyCases {
  public cases: Cases[];

  constructor(public date: Date) {
    this.cases = [];
    for (let i = 0; i < numberOfProvinces; i++) {
      this.cases.push({ id: Provinces[i], cases: -1 });
    }
  }
}
