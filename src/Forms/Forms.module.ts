import { Module } from '@nestjs/common';
import { FormsService } from './Forms.service';
import { FormsController } from './Forms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
