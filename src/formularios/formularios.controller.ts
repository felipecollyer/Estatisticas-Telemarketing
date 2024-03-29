import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Response } from 'express';
import { gerarEstatisticas } from './Handlers/GerarEstatisticas';

@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @UseInterceptors(LogInterceptor)
  @Get('visualizar')
  async findAll(@Body() body, @Res() response: Response) {
    const data = await this.formulariosService.findAll(body);

    const { formularios } = data;

    const estatisticasFormularios = gerarEstatisticas(formularios);
    console.log(formularios);

    return response.render('index', {
      estatisticasFormularios,
      formularios,
    });
  }

  @Get()
  findOne() {
    return this.formulariosService.findOne();
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formulariosService.update(+id, updateFormularioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulariosService.remove(+id);
  }
}
