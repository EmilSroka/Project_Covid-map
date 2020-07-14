import { Component } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { DailyCases } from '@covid-app/types';

const dateOfFirstCase = new Date(2020, 2, 4);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  public isErrorMessage = false;
  public date = dateOfFirstCase;
  public provinces = [];
  public cases = [];

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService
  ) {
    this.updateData(this.date);

    this.provinces = this.provincesService.getProvinces();
  }

  updateData(newDate: Date): void {
    this.casesService.getCases(newDate).subscribe(
      ({ cases, date }: DailyCases) => {
        this.cases = cases;
        this.date = new Date(date);
        this.isErrorMessage = false;
      },
      ({ cases, date }: DailyCases) => {
        this.cases = cases;
        this.date = new Date(date);
        this.isErrorMessage = true;
      }
    );
  }
}
