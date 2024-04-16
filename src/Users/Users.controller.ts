import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';

import {
  CriarUsuarioDTO,
  UpdatePutUsuarioDTO,
  UpdatePatchUsuarioDTO,
  LoginUserDTO,
} from './dto/index';

import { UsersService } from './Users.Service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(LogInterceptor)
  @Post('register')
  async createUser(@Body() data: CriarUsuarioDTO) {
    return this.usersService.createUser(data);
  }

  @Post('login')
  async Login(@Body() data: LoginUserDTO) {
    return this.usersService.Login(data);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Put(':id')
  async UpdateAll(
    @Body() data: UpdatePutUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.UpdateAllData(id, data);
  }

  @Patch(':id')
  async updatePartials(
    @Body() data: UpdatePatchUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.UpdatePartialsData(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
