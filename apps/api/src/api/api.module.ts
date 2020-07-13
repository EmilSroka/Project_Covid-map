import { Module, HttpModule } from '@nestjs/common';
import { DayController } from './day/day.controller';
import { DataService } from './data/data.service';

@Module({
  controllers: [DayController],
  providers: [DataService],
  imports: [HttpModule],
})
export class ApiModule {}
