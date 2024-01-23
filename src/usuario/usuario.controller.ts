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
} from '@nestjs/common';

import { CriarUsuarioDTO } from './dto/create.usuario.dto';
import { UpdatePutUsuarioDTO } from './dto/update-put-usuario.dto';
import { UpdatePatchUsuarioDTO } from './dto/update-patch-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  @Post()
  async create(@Body() { email, name, password }: CriarUsuarioDTO) {
    return { email, name, password };
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return { user: [], id };
  }

  @Put(':id')
  async update(
    @Body() { email, name, password }: UpdatePutUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      email,
      name,
      password,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() { email, name, password }: UpdatePatchUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      email,
      name,
      password,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
