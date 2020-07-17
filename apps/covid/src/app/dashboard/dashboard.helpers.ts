import { RoutesRecognized } from '@angular/router';
import { dateStringToDate } from '@covid-app/helpers';
import { CasesService } from './cases/cases.service';
import { Observer } from 'rxjs';
import { Cases } from '@covid-app/types';

export function pathHandlerFactory(
  event: RoutesRecognized
): (
  casesService: CasesService,
  observer: Observer<Cases[]>
) => [Date, Date, Date] {
  if (event.state.root.firstChild.url[0].path === 'date') {
    return dateHandler;
  } else {
    return intervalHandler;
  }

  function dateHandler(
    casesService: CasesService,
    observer: Observer<Cases[]>
  ): [Date, Date, Date] {
    const date = dateStringToDate(event.state.root.firstChild.params.day);
    casesService.getCasesByDay(date).subscribe(observer);
    return [date, null, null];
  }

  function intervalHandler(
    casesService: CasesService,
    observer: Observer<Cases[]>
  ): [Date, Date, Date] {
    const startDate = dateStringToDate(
      event.state.root.firstChild.params.start
    );
    const endDate = dateStringToDate(event.state.root.firstChild.params.stop);
    casesService.getCasesByInterval(startDate, endDate).subscribe(observer);
    return [null, startDate, endDate];
  }
}
