import { Component } from '@angular/core';
import { ProvincesService } from './provinces/provinces.service';
import { CasesService } from './cases/cases.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent {
  public title = 'Coronavirus cases in Poland';

  constructor(
    public provincesService: ProvincesService,
    public casesService: CasesService
  ) {}
}
