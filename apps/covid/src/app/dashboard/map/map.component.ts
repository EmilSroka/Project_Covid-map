import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  HostListener,
  EventEmitter,
  OnInit,
} from '@angular/core';
import {
  max,
  byID,
  calculateLightness,
  noDataForThisDay,
  calculateTooltipData,
} from './map.helpers';
import { Province, Cases, validHue } from '../types/data.types';
import { filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'covid-app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnInit {
  @Input() provinces: Province[];
  @Input() casesInProvinces: Cases[];
  @Input() hue: validHue = 355;
  @Input() titleID: string;

  private maxCases = 0;

  public isTooltipVisible = false;
  public tooltipPosition = { x: 0, y: 0 };
  public tooltipContent = '';

  readonly tooltipTime = 1000;

  private mouseMove$ = new EventEmitter<MouseEvent>();
  private isMouseOver = false;

  ngOnInit(): void {
    this.mouseMove$
      .pipe(
        debounceTime(this.tooltipTime),
        filter(() => this.isMouseOver)
      )
      .subscribe((event) => this.handleTooltip(event));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.casesInProvinces) {
      this.maxCases = this.casesInProvinces.reduce(
        max,
        this.casesInProvinces[0] ? this.casesInProvinces[0].cases : 0
      );
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.isTooltipVisible = false;
    this.mouseMove$.emit(event);
    event.stopPropagation();
  }

  getColorByID(id: string): string {
    if (!this.casesInProvinces) return 'black';

    const casesInProvince = this.casesInProvinces.find(byID(id))?.cases;

    if (noDataForThisDay(casesInProvince)) return 'black';

    const lightness = calculateLightness(casesInProvince, this.maxCases);
    return `hsla(${this.hue},100%,${lightness}%,1)`;
  }

  handleTooltip(event: MouseEvent): void {
    if ((event.target as HTMLElement).tagName !== 'path') return;

    [this.tooltipContent, this.tooltipPosition] = calculateTooltipData(
      event,
      this.provinces,
      this.casesInProvinces,
      { x: event.clientX, y: event.clientY }
    );
    this.isTooltipVisible = true;
  }

  getProvinceDescriptionByID(id: string): string {
    const provinceName = this.provinces.find(byID(id))?.name;
    const provinceCases = this.casesInProvinces.find(byID(id))?.cases;

    const casesInfo =
      provinceCases === -1 ? 'no data' : `${provinceCases} cases`;
    return `${provinceName}: ${casesInfo}`;
  }

  updateMouseInfo(type: string) {
    this.isMouseOver = type === 'mouseover' ? true : false;
  }
}
