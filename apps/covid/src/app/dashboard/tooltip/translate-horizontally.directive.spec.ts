import { TranslateHorizontallyDirective } from './translate-horizontally.directive';
import { Component, DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'covid-app-test-container',
  template: `<div style="width:100px;left:300px;top:100px" class="tested">
    content
  </div>`,
})
class ContainerComponent {}

describe('TranslateHorizontallyDirective', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent, TranslateHorizontallyDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new TranslateHorizontallyDirective(de);
    expect(directive).toBeTruthy();
  });

  it('should change "left" property by "input * element width" rounded to integer after ngAfterContentInit', () => {
    const nativeElement = de.query(By.css('.tested')).nativeElement;
    const inputs = [0.5, -0.5, -5, 2, 0, 1.5, 0.333, 0.777, 20];

    const defaultPosition = 300;
    const width = 100;

    spyOn(nativeElement, 'getBoundingClientRect').and.callFake(function () {
      return {
        width: parseInt(window.getComputedStyle(nativeElement).width, 10),
        height: 0,
        left: parseInt(window.getComputedStyle(nativeElement).left, 10),
        top: parseInt(window.getComputedStyle(nativeElement).top, 10),
        right: 0,
        bottom: 0,
      };
    });

    const directive = new TranslateHorizontallyDirective({ nativeElement });

    for (const input of inputs) {
      nativeElement.style.left = `${defaultPosition}px`;
      directive.transitionPercentage = input;
      directive.ngAfterContentInit();

      const left = parseInt(window.getComputedStyle(nativeElement).left, 10);

      expect(left).toBeCloseTo(defaultPosition + width * input, -1);
    }
  });
});
