// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

// components
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard.component';
import { ToggleComponent } from './toggle/toggle.component';
import { DateRouteComponent } from './date-route/date-route.component';
import { IntervalRouteComponent } from './interval-route/interval-route.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { TooltipComponent } from './tooltip/tooltip.component';

// providers
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';

@NgModule({
  declarations: [
    MapComponent,
    DashboardComponent,
    DatePickerComponent,
    TooltipComponent,
    DateRouteComponent,
    IntervalRouteComponent,
    ToggleComponent,
  ],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  exports: [DashboardComponent],
  providers: [ProvincesService, CasesService],
})
export class DashboardModule {}
