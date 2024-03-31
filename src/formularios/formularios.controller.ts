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
  ParseIntPipe,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Response } from 'express';
import { gerarEstatisticas } from './Handlers/GerarEstatisticas';

@Controller('forms')
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

    const { forms } = data;

    const estatisticasFormularios = gerarEstatisticas(forms);

    return response.render('index', {
      estatisticasFormularios,
      forms,
    });
  }

  @Get()
  findOne() {
    return this.formulariosService.findOne();
  }

  @Patch(':id')
  updateForm(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formulariosService.updateForm(+id, updateFormularioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulariosService.remove(+id);
  }
}
