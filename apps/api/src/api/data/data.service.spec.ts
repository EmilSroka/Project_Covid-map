import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

// @ts-ignore
const dataServiceFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
}));

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: 'DataService', useFactory: dataServiceFactory }],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
