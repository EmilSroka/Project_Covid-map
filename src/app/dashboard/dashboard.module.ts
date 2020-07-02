// angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// components
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard.component';

// providers
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';

@NgModule({
  declarations: [MapComponent, DashboardComponent],
  imports: [BrowserModule],
  exports: [DashboardComponent],
  providers: [ProvincesService, CasesService],
})
export class DashboardModule {}
