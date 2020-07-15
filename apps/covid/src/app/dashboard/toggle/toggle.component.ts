import { Component, Input } from '@angular/core';

@Component({
  selector: 'covid-app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent {
  @Input() position: number;

  constructor() {}
}
