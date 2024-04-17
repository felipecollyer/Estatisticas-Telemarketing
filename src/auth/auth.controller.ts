import {
  Controller,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  Query,
  Headers,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { AuthRegisterDTO } from './dto/auth-register-dto';
import { ApproveUserDTO } from './dto/auth-approveUser-dta';
import { AuthForgetDTO } from './dto/auth-forget-dto ';
import { Body } from '@nestjs/common';
import { AuthResetDTO } from './dto/auth-reset-dto';
import { UsersService } from 'src/Users/Users.Service';
import { request } from 'express';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async Login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('approveUser')
  async approveUser(@Query() data: ApproveUserDTO, @Req() request: Request) {
    const authHeader = request.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.authService.approveUser(data, token);
    } else {
      throw new UnauthorizedException('Token nao valido');
    }
  }

  @Patch('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @Post('me')
  async check(@Body() body) {
    return this.authService.checkToken(body.token);
  }
}
