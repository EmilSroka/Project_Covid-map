import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DateRouteComponent } from './date-route/date-route.component';
import { IntervalRouteComponent } from './interval-route/interval-route.component';
import { TitleComponent } from './title/title.component';
import { RangeTitleComponent } from './range-title/range-title.component';
// import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: 'date/:day',
    component: DateRouteComponent,
  },
  {
    path: 'interval/:start/:stop',
    component: IntervalRouteComponent,
  },
  {
    path: 'date/:day',
    component: TitleComponent,
    outlet: 'title',
  },
  {
    path: 'interval/:start/:stop',
    component: RangeTitleComponent,
    outlet: 'title',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
