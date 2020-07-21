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
  calcTooltipState,
  getByID,
  calculateColor,
  getMaxCases,
  calcTooltipStateFromMouseEvent,
  calcTooltipStateFromFocusEvent,
  getProvinceDescription,
} from '@covid-app/helpers';
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
  @Input() hue = 355;
  @Input() titleID: string;

  private maxCases = 0;

  public isTooltipVisible = false;
  public tooltipPosition = { x: 0, y: 0 };
  public tooltipContent = '';

  readonly tooltipTime = 1000;

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
      this.maxCases = getMaxCases(this.casesInProvinces);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.hideTooltip();
    this.mouseMove$.emit(event);
    event.stopPropagation();
  }

  getColorByID(id: string): string {
    if (!this.casesInProvinces) return 'black';

    return calculateColor(this.hue, id, this.maxCases, this.casesInProvinces);
  }

  handleTooltip(event: MouseEvent): void {
    [
      this.tooltipContent,
      this.tooltipPosition,
      this.isTooltipVisible,
    ] = calcTooltipStateFromMouseEvent(
      event,
      this.provinces,
      this.casesInProvinces
    );
  }

  getProvinceDescriptionByID(id: string): string {
    return getProvinceDescription(id, this.provinces, this.casesInProvinces);
  }

  updateMouseInfo(type: string) {
    this.isMouseOver = type === 'mouseover' ? true : false;
  }

  showTooltip(event: FocusEvent) {
    [
      this.tooltipContent,
      this.tooltipPosition,
      this.isTooltipVisible,
    ] = calcTooltipStateFromFocusEvent(
      event,
      this.provinces,
      this.casesInProvinces
    );
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }
}
