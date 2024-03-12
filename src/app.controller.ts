import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getView(@Res() res: Response): any {
    return res.render('index', {
      message: this.appService.getHello(),
    });
  }

  @Post()
  PostHello(): string {
    return `POST: hellow word`;
  }
}
