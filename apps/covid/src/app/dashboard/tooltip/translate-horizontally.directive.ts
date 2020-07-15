import {
  Directive,
  ElementRef,
  Input,
  AfterContentInit,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[covidAppTranslateHorizontally]',
})
export class TranslateHorizontallyDirective
  implements AfterContentInit, OnChanges {
  @Input('covidAppTranslateHorizontally') transitionPercentage: number;

  constructor(private el: ElementRef) {}

  ngAfterContentInit(): void {
    const width = this.el.nativeElement.getBoundingClientRect().width;
    const position = parseInt(this.el.nativeElement.style.left || 0, 0);
    const newPosition = position + width * this.transitionPercentage;

    console.log(width, position, newPosition);

    this.el.nativeElement.style.left = `${newPosition}px`;
  }

  ngOnChanges(): void {
    const width = this.el.nativeElement.getBoundingClientRect().width;
    const position = parseInt(this.el.nativeElement.style.left || 0, 0);
    const newPosition = position + width * this.transitionPercentage;

    console.log(width, position, newPosition);

    this.el.nativeElement.style.left = `${newPosition}px`;
  }
}
