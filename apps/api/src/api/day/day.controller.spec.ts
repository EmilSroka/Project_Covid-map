import { Test, TestingModule } from '@nestjs/testing';
import { DayController } from './day.controller';

// @ts-ignore
const dataServiceFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('Day Controller', () => {
  let controller: DayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DayController],
      providers: [{ provide: 'DataService', useFactory: dataServiceFactory }],
    }).compile();

    controller = module.get<DayController>(DayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
