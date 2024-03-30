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
  async CreateOne(@Body() data: CriarUsuarioDTO) {
    return this.userService.Create(data);
  }

  @Post('login') // Rota para o login
  async Login(@Body() data: LoginUserDTO) {
    return this.userService.CheckLogin(data);
  }

  @Get(':id')
  async SearchOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.FindOne(id);
  }

  @Get()
  async SearchAll() {
    return this.userService.FindAll();
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
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteOneUser(id);
  }
}
