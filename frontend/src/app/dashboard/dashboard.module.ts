// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// components
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard.component';

// providers
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TranslateHorizontallyDirective } from './tooltip/translate-horizontally.directive';

@NgModule({
  declarations: [
    MapComponent,
    DashboardComponent,
    DatePickerComponent,
    TooltipComponent,
    TranslateHorizontallyDirective,
  ],
  imports: [BrowserModule, HttpClientModule],
  exports: [DashboardComponent],
  providers: [ProvincesService, CasesService],
})
export class DashboardModule {}
