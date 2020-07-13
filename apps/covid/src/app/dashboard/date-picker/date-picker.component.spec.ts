import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerComponent } from './date-picker.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize value to currentDate input', () => {
    const cases: Array<[Date, string]> = [
      [new Date(2020, 0, 1), '2020-01-01'],
      [new Date(2020, 5, 22), '2020-06-22'],
      [new Date(1999, 2, 12), '1999-03-12'],
      [new Date(2022, 3, 30), '2022-04-30'],
    ];

    for (const [input, expected] of cases) {
      component.currentDate = input;
      fixture.detectChanges();

      expect(de.query(By.css('input')).nativeElement.value).toBe(expected);
    }
  });
});
