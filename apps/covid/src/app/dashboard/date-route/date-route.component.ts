import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { dateStringToDate, dateToDateString } from '@covid-app/helpers';

@Component({
  selector: 'covid-app-date-route',
  templateUrl: './date-route.component.html',
  styleUrls: ['./date-route.component.scss'],
})
export class DateRouteComponent implements OnInit {
  day: Date;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.day = dateStringToDate(params.get('day'));
    });
  }

  updateRoute(date: Date) {
    this.router.navigate(['/date/', dateToDateString(date)]);
  }
}
