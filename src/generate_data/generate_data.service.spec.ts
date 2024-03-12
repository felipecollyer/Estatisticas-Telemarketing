import { Test, TestingModule } from '@nestjs/testing';
import { GenerateDataService } from './generate_data.service';

describe('GenerateDataService', () => {
  let service: GenerateDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateDataService],
    }).compile();

    service = module.get<GenerateDataService>(GenerateDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
