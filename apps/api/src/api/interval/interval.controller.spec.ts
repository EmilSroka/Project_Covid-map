import { Test, TestingModule } from '@nestjs/testing';
import { IntervalController } from './interval.controller';

// @ts-ignore
const dataServiceFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('Interval Controller', () => {
  let controller: IntervalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntervalController],
      providers: [{ provide: 'DataService', useFactory: dataServiceFactory }],
    }).compile();

    controller = module.get<IntervalController>(IntervalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
