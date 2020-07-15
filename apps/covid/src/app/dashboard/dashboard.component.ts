import { Component, OnInit } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { Cases } from '@covid-app/types';
import { Router, RoutesRecognized } from '@angular/router';
import { toDate } from './helpers/date.helpers';

const dateOfFirstCase = new Date(2020, 2, 4);

@Component({
  selector: 'covid-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public isErrorMessage = false;
  public date: Date = dateOfFirstCase;
  public startDate: Date;
  public stopDate: Date;
  public provinces = [];
  public cases = [];

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService,
    private router: Router
  ) {
    this.provinces = this.provincesService.getProvinces();
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof RoutesRecognized) {
        if (val.state.root.firstChild.url[0].path === 'date') {
          this.date = toDate(val.state.root.firstChild.params.day);
          this.startDate = null;
          this.stopDate = null;
          this.cases = [];
          this.updateData(this.date);
        } else {
          this.date = null;
          this.startDate = toDate(val.state.root.firstChild.params.start);
          this.stopDate = toDate(val.state.root.firstChild.params.stop);
          this.cases = [];
          this.updateInterval(this.startDate, this.stopDate);
        }
      }
    });
  }

  updateData(newDate: Date): void {
    this.casesService.getCasesByDay(newDate).subscribe(
      (cases: Cases[]) => {
        this.cases = cases;
        this.isErrorMessage = false;
      },
      (cases: Cases[]) => {
        this.cases = cases;
        this.isErrorMessage = true;
      }
    );
  }

  updateInterval(start: Date, stop: Date): void {
    this.casesService.getCasesByInterval(start, stop).subscribe(
      (cases: Cases[]) => {
        this.cases = cases;
        this.isErrorMessage = false;
      },
      (cases: Cases[]) => {
        this.cases = cases;
        this.isErrorMessage = true;
      }
    );
  }
}
