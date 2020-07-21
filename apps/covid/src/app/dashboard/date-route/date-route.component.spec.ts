import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRouteComponent } from './date-route.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

class ActivatedRouteMock {
  paramMap = new Observable((observer) => {
    observer.next({ get: () => '04-03-2020' });
    observer.complete();
  });
}

describe('DateRouteComponent', () => {
  let component: DateRouteComponent;
  let fixture: ComponentFixture<DateRouteComponent>;
  let de: DebugElement;
  let routerMock: Router;

  beforeEach(async(() => {
    const router = { navigate: jest.fn() };
    TestBed.configureTestingModule({
      declarations: [DateRouteComponent, DatePickerComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRouteComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    routerMock = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should consist of date picker', () => {
    const datePicker = de.query(By.css('.date-picker'));
    expect(datePicker).toBeTruthy();
    expect(datePicker.nativeElement.value).toBe('2020-03-04');
  });

  it('should navigate to proper URL after date change', () => {
    component.updateRoute(new Date(2020, 2, 30));
    expect(routerMock.navigate).toBeCalledWith(['/date/', '30-03-2020']);
  });
});
