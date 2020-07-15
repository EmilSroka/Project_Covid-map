import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRouteComponent } from './date-route.component';

describe('DateRouteComponent', () => {
  let component: DateRouteComponent;
  let fixture: ComponentFixture<DateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRouteComponent ]
    })
    .compileComponents();
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
