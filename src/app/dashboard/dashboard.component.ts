import { Component } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';

@Component({
  selector: 'app-dashboard',
  template: `<app-map
    [provinces]="provincesService.getProvinces()"
    [casesInProvinces]="casesService.getCases()"
  ></app-map>`,
  styles: [''],
})
export class DashboardComponent {
  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService
  ) {}
}
