import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRouteComponent } from './date-route.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DateRouteComponent', () => {
  let component: DateRouteComponent;
  let fixture: ComponentFixture<DateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateRouteComponent, DatePickerComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
