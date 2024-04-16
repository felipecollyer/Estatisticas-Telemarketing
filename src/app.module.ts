import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/Users.module';
import { FormsModule } from './Forms/Forms.module';
import { ExpressHandlebars } from 'express-handlebars';
import { GenerateDataModule } from './generate_data/generate_data.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    FormsModule,
    ExpressHandlebars,
    GenerateDataModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
