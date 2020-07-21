import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {} from '@covid-app/helpers';

@Component({
  selector: 'covid-app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() label: string;
  @Input() currentDate: Date;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Output() dateChange = new EventEmitter<Date>();

  isFocusStyle = false;

  constructor() {}

  ngOnInit(): void {}

  changeDate(date: string): void {
    this.dateChange.emit(new Date(date));
  }

  setFocusStyleToWrapper(input: boolean): void {
    this.isFocusStyle = input;
  }
}
