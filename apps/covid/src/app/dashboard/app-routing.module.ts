import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DateRouteComponent } from './date-route/date-route.component';
import { IntervalRouteComponent } from './interval-route/interval-route.component';

const routes: Routes = [
  {
    path: 'date/:day',
    component: DateRouteComponent,
  },
  {
    path: 'interval/:start/:stop',
    component: IntervalRouteComponent,
  },
  { path: '**', redirectTo: '/date/04-03-2020' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
