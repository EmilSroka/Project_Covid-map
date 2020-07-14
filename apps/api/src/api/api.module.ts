import { Module, HttpModule } from '@nestjs/common';
import { DayController } from './day/day.controller';
import { DataService } from './data/data.service';
import { IntervalController } from './interval/interval.controller';

@Module({
  controllers: [DayController, IntervalController],
  providers: [DataService],
  imports: [HttpModule],
})
export class ApiModule {}
