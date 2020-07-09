import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent implements OnInit {
  @Input() content = 'Tooltip';
  @Input() postion = { x: 0, y: 0 };
  @Input() isVisible = false;

  constructor() {}

  ngOnInit(): void {}
}
