import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { max, byID, calculateLightness } from './map.helpers';
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

  getColorByID(id: string): string {
    if (!this.casesInProvinces) {
      return 'black';
    }

    const casesInProvince = this.casesInProvinces.find(byID(id))?.cases;
    const lightness = calculateLightness(casesInProvince, this.maxCases);
    return `hsla(${this.hue},100%,${lightness}%,1)`;
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
