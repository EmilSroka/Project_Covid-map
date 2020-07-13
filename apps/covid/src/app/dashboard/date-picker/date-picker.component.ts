import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'covid-app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() currentDate: Date;
  @Output() dateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {}

  getFormattedDate(): string {
    return `${this.currentDate.getFullYear()}-${
      this.currentDate.getMonth() + 1
    }-${this.currentDate.getDay()}`;
  }

  changeDate(date: string): void {
    this.dateChange.emit(new Date(date));
  }
}
