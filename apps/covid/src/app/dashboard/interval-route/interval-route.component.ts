import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dateStringToDate, dateToDateString } from '@covid-app/helpers';

@Component({
  selector: 'covid-app-interval-route',
  templateUrl: './interval-route.component.html',
  styleUrls: ['./interval-route.component.scss'],
})
export class IntervalRouteComponent implements OnInit {
  start: Date;
  stop: Date;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.start = dateStringToDate(params.get('start'));
      this.stop = dateStringToDate(params.get('stop'));
    });
  }

  getMaxLimit() {
    const copy = new Date(this.stop.toDateString());
    return copy.setDate(copy.getDate() - 1);
  }

  getMinLimit() {
    const copy = new Date(this.start.toDateString());
    return copy.setDate(copy.getDate() + 1);
  }

  updateFirstRouteParam(date: Date) {
    this.router.navigate([
      '/interval/',
      dateToDateString(date),
      dateToDateString(this.stop),
    ]);
  }

  updateSecondRouteParam(date: Date) {
    this.router.navigate([
      '/interval/',
      dateToDateString(this.start),
      dateToDateString(date),
    ]);
  }
}
