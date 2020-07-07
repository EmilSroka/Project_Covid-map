import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import {
  max,
  byID,
  calculateLightness,
  noDataForThisDay,
  wait,
  arePositionsEqual,
} from './map.helpers';
import { Province, Cases, validHue } from '../types/data.types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() provinces: Province[];
  @Input() casesInProvinces: Cases[];
  @Input() hue: validHue = 355;

  private maxCases = 0;

  public isTooltipVisible = false;
  public tooltipPosition = { x: 0, y: 0 };
  public tooltipContent = '';

  private currentMousePosition = { x: 0, y: 0 };
  private readonly tooltipTime = 1000;

  getColorByID(id: string): string {
    if (!this.casesInProvinces) return 'black';

    const casesInProvince = this.casesInProvinces.find(byID(id))?.cases;

    if (noDataForThisDay(casesInProvince)) return 'black';

    const lightness = calculateLightness(casesInProvince, this.maxCases);
    return `hsla(${this.hue},100%,${lightness}%,1)`;
  }

  async handleTooltip(event: MouseEvent): Promise<void> {
    this.isTooltipVisible = false;
    this.currentMousePosition = { x: event.clientX, y: event.clientY };
    const onEventStartMousePosition = { x: event.clientX, y: event.clientY };
    await wait(this.tooltipTime);
    if (
      arePositionsEqual(this.currentMousePosition, onEventStartMousePosition)
    ) {
      const provinceID = (event.target as HTMLInputElement).getAttribute('id');
      const provinceName = this.provinces.find(byID(provinceID))?.name;
      const provinceCases = this.casesInProvinces.find(byID(provinceID))?.cases;

      this.tooltipContent = `${provinceName}: ${provinceCases}`;
      this.tooltipPosition = {
        x: this.currentMousePosition.x,
        y: this.currentMousePosition.y + 20,
      };
      this.isTooltipVisible = true;
    }
  }

  hideTooltip(): void {
    this.isTooltipVisible = false;
    this.currentMousePosition = { x: -1, y: -1 };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.casesInProvinces) {
      this.maxCases = this.casesInProvinces.reduce(
        max,
        this.casesInProvinces[0] ? this.casesInProvinces[0].cases : 0
      );
    }
  }
}
