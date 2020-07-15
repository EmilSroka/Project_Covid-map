import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toDate } from '../helpers/date.helpers';
import { map } from 'rxjs/operators';

@Component({
  selector: 'covid-app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  date: Date;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.date = toDate(params.get('day'));
      console.log(this.date);
    });
    // this.route.paramMap.subscribe((params) => {
    //   this.date = toDate(params.get('day'));
    // });
  }
}
