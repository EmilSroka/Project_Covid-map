import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toDate, toString } from '../helpers/date.helpers';

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
      this.day = toDate(params.get('day'));
    });
  }

  updateRoute(date: Date) {
    this.router.navigate(['/date/', toString(date)]);
  }
}
