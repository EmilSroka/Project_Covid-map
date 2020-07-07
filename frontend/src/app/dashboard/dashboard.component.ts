import { Component } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { DailyCases } from './types/data.types';

const dateOfFirstCase = new Date(2020, 2, 4);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  public date = dateOfFirstCase;
  public cases = [];

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService
  ) {
    this.casesService
      .getCases(this.date)
      .subscribe(({ cases }: DailyCases) => (this.cases = cases));
  }

  updateData(newDate: Date): void {
    this.date = newDate;
    this.casesService
      .getCases(this.date)
      .subscribe(({ cases }: DailyCases) => (this.cases = cases));
  }
}
