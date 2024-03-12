import { Module } from '@nestjs/common';
import { GenerateDataService } from './generate_data.service';
import { GenerateDataController } from './generate_data.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GenerateDataController],
  providers: [GenerateDataService],
})
export class GenerateDataModule {}
