import { Component } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { DailyCases } from './types/data.types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  public title = 'Coronavirus cases in Poland';
  public date = new Date(2020, 2, 8);
  public cases = [];

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService
  ) {
    casesService
      .getCases(this.date)
      .subscribe(({ cases }: DailyCases) => (this.cases = cases));
  }
}
