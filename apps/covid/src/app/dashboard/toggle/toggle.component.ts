import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'covid-app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnChanges {
  @Input() position: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
