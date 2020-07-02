import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { minmax, getFirstValue, byID, calculateLightness } from './map.helpers';
import { Province, ProvinceCases } from './map.types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() provinces: Province[];

  @Input() casesInProvinces: ProvinceCases[];

  private minCases = 0;
  private maxCases = 0;

  constructor() {}

  getColorByID(id: string): string {
    if (!this.casesInProvinces) {
      return 'black';
    }

    const casesInProvince = this.casesInProvinces.find(byID(id)).cases;

    const lightness = calculateLightness(
      casesInProvince,
      this.minCases,
      this.maxCases
    );
    return `hsla(338,100%,${lightness}%,1)`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.casesInProvinces) {
      [this.minCases, this.maxCases] = this.casesInProvinces.reduce(
        minmax,
        getFirstValue(this.casesInProvinces)
      );
    }
  }
}
