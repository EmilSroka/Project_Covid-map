import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toDate, toString } from '../helpers/date.helpers';

@Component({
  selector: 'covid-app-interval-route',
  templateUrl: './interval-route.component.html',
  styleUrls: ['./interval-route.component.css'],
})
export class IntervalRouteComponent implements OnInit {
  start: Date;
  stop: Date;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.start = toDate(params.get('start'));
      this.stop = toDate(params.get('stop'));
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
    this.router.navigate(['/interval/', toString(date), toString(this.stop)]);
  }

  updateSecondRouteParam(date: Date) {
    this.router.navigate(['/interval/', toString(this.start), toString(date)]);
  }
}
