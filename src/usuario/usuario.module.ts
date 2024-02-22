import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UserIdCheckMiddleware } from '../middlewares/user-id-check.middleware';
import { UsuarioService } from './usuario.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [],
})
export class UsuarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdCheckMiddleware).forRoutes({
      path: 'usuarios/:id',
      method: RequestMethod.ALL,
    });
  }
}
