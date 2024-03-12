import { Test, TestingModule } from '@nestjs/testing';
import { GenerateDataController } from './generate_data.controller';
import { GenerateDataService } from './generate_data.service';

describe('GenerateDataController', () => {
  let controller: GenerateDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenerateDataController],
      providers: [GenerateDataService],
    }).compile();

    controller = module.get<GenerateDataController>(GenerateDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
