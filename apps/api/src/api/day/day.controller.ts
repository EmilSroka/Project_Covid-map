import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { DateValidator, convertToDate } from './date.helpers';
import { DataService } from '../data/data.service';
import { DailyCases } from '../types/data.types';

@Controller('day')
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
