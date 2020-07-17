import { Component, OnInit } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { Cases } from '@covid-app/types';
import { Router, RoutesRecognized } from '@angular/router';
import { pathHandlerFactory } from './dashboard.helpers';
import { Observer } from 'rxjs';
import { filter } from 'rxjs/operators';

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

  private readonly casesObserver: Observer<Cases[]> = {
    next: (cases: Cases[]) => {
      this.cases = cases;
      this.isErrorMessage = false;
    },
    error: (cases: Cases[]) => {
      this.cases = cases;
      this.isErrorMessage = true;
    },
    complete: null,
  };

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.provincesService
      .getProvinces()
      .subscribe((provinces) => (this.provinces = provinces));

    this.router.events
      .pipe(filter((value) => value instanceof RoutesRecognized))
      .subscribe((event: RoutesRecognized) => {
        [this.date, this.startDate, this.stopDate] = pathHandlerFactory(event)(
          this.casesService,
          this.casesObserver
        );
        this.cases = [];
      });
  }
}
