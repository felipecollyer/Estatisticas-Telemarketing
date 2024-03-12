import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { FormulariosModule } from './formularios/formularios.module';
import { ExpressHandlebars } from 'express-handlebars';
import { GenerateDataModule } from './generate_data/generate_data.module';

@Module({
  imports: [
    UsuarioModule,
    PrismaModule,
    FormulariosModule,
    ExpressHandlebars,
    GenerateDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
