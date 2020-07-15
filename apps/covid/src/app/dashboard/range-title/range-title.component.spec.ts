import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeTitleComponent } from './range-title.component';

describe('RangeTitleComponent', () => {
  let component: RangeTitleComponent;
  let fixture: ComponentFixture<RangeTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
