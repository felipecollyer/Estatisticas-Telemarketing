import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/Users.module';
import { FormsModule } from './Forms/Forms.module';
import { PrismaModule } from './prisma/prisma.module';
import { ExpressHandlebars } from 'express-handlebars';
import { GenerateDataModule } from './generate_data/generate_data.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    FormsModule,
    ExpressHandlebars,
    GenerateDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
