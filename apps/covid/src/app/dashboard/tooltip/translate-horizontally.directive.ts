import { Directive, ElementRef, Input, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appTranslateHorizontally]',
})
export class TranslateHorizontallyDirective implements AfterContentInit {
  @Input('appTranslateHorizontally') transitionPercentage: number;

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    const width = this.el.nativeElement.getBoundingClientRect().width;
    const position = this.el.nativeElement.getBoundingClientRect().left;
    const newPosition = position + width * this.transitionPercentage;

    this.el.nativeElement.style.left = `${newPosition}px`;
  }
}
