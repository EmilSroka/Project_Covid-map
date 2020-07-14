import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  HostListener,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  max,
  byID,
  calculateLightness,
  noDataForThisDay,
  isProvince,
} from './map.helpers';
import { Province, Cases } from '@covid-app/types';
import { filter, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'covid-app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges, OnInit, OnDestroy {
  @Input() provinces: Province[];
  @Input() casesInProvinces: Cases[];
  @Input() hue: number = 355;
  @Input() titleID: string;

  private maxCases = 0;

  public isTooltipVisible = false;
  public tooltipPosition = { x: 0, y: 0 };
  public tooltipContent = '';

  readonly tooltipTime = 1000;
  readonly tooltipOffset = 30;

  private mouseMove$ = new EventEmitter<MouseEvent>();
  private mouseMoveSubscription: Subscription;
  private isMouseOver = false;

  ngOnInit(): void {
    this.mouseMoveSubscription = this.mouseMove$
      .pipe(
        debounceTime(this.tooltipTime),
        filter(() => this.isMouseOver)
      )
      .subscribe((event) => this.handleTooltip(event));
  }

  ngOnDestroy(): void {
    this.mouseMoveSubscription.unsubscribe();
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
    return `hsla(${Math.round(this.hue)},100%,${lightness}%,1)`;
  }

  handleTooltip({ target, clientX, clientY }: MouseEvent): void {
    if (!isProvince(target)) return;

    const provinceID = (target as HTMLElement).getAttribute('id');
    const provinceName = this.provinces.find(byID(provinceID))?.name;
    const provinceCases = this.casesInProvinces.find(byID(provinceID))?.cases;
    const casesInfo = provinceCases === -1 ? 'no data' : provinceCases;

    this.tooltipContent = `${provinceName}: ${casesInfo}`;
    this.tooltipPosition = {
      x: clientX,
      y: clientY + document.documentElement.scrollTop + this.tooltipOffset,
    };
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
