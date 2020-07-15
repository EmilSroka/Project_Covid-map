import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalRouteComponent } from './interval-route.component';

describe('IntervalRouteComponent', () => {
  let component: IntervalRouteComponent;
  let fixture: ComponentFixture<IntervalRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
