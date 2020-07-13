import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[covidAppTranslateHorizontally]',
})
export class TranslateHorizontallyDirective implements AfterContentInit {
  @Input('covidAppTranslateHorizontally') transitionPercentage: number;

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    const width = this.el.nativeElement.getBoundingClientRect().width;
    const position = this.el.nativeElement.getBoundingClientRect().left;
    const newPosition = position + width * this.transitionPercentage;

    this.el.nativeElement.style.left = `${newPosition}px`;
  }
}
