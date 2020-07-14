import { Controller, Param, BadRequestException, Get } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { DateValidator, convertToDate } from '../helpers/date.helpers';

@Controller('api/interval')
export class IntervalController {
  constructor(private wikipediaAPI: DataService) {}

  @Get(':start/:stop')
  async getData(@Param('start') start: string, @Param('stop') stop: string) {
    if (!this.areParamsCorrect(start, stop)) {
      throw new BadRequestException('Invalid date');
    }

    return this.wikipediaAPI.getByInterval(
      convertToDate(start),
      convertToDate(stop)
    );
  }

  private areParamsCorrect(start: string, stop: string) {
    return (
      new DateValidator(start).isValid() &&
      new DateValidator(stop).isValid() &&
      convertToDate(stop).getTime() - convertToDate(start).getTime() > 0
    );
  }
}
