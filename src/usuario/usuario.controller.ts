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

import { UserService } from './usuario.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  async createUser(@Body() data: CriarUsuarioDTO) {
    return this.userService.createUser(data);
  }

  @Post('login')
  async Login(@Body() data: LoginUserDTO) {
    return this.userService.Login(data);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async UpdateAll(
    @Body() data: UpdatePutUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.UpdateAllData(id, data);
  }

  @Patch(':id')
  async updatePartials(
    @Body() data: UpdatePatchUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.UpdatePartialsData(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }
}
