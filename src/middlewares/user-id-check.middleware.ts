import { NestMiddleware, BadRequestException } from '@nestjs/common';
import { NextFunction, Request } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes');

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('Id invalido');
    }

    console.log('UserIdCheckMiddleware', 'depois');

    next();
  }
}
