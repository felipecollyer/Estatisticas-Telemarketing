import { Module } from '@nestjs/common';
import { FormsService } from './Forms.service';
import { FormsController } from './Forms.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
