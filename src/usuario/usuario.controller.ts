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

import { CriarUsuarioDTO } from './dto/create.usuario.dto';
import { UpdatePutUsuarioDTO } from './dto/update-put-usuario.dto';
import { UpdatePatchUsuarioDTO } from './dto/update-patch-usuario.dto';
import { UsuarioService } from './usuario.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioServico: UsuarioService) {}

  @UseInterceptors(LogInterceptor)
  @Post()
  async create(@Body() data: CriarUsuarioDTO) {
    return this.usuarioServico.create(data);
  }

  @Get()
  async read() {
    return this.usuarioServico.readOne();
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioServico.readAll({ id });
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuarioServico.update(id, data);
  }

  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usuarioServico.updatePartials(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioServico.delete({ id });
  }
}
