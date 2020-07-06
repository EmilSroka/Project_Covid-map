import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { DateValidator, convertToDate } from './date.helpers';
import { DataService } from '../data/data.service';

@Controller('api/day')
export class DayController {
  constructor(private wikipediaAPI: DataService) {}

  @Get(':day')
  async getData(@Param('day') day: string) {
    if (!new DateValidator(day).isValid) {
      throw new BadRequestException('Invalid date');
    }

    return this.wikipediaAPI.get(convertToDate(day));
  }
}
