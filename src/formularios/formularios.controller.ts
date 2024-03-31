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
  createForms(
    @Body() createFormularioDto: CreateFormularioDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formulariosService.createForms(createFormularioDto, headers);
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  async getForms(@Body() body, @Res() response: Response) {
    const data = await this.formulariosService.getForms(body);

    const { forms } = data;

    const estatisticasFormularios = gerarEstatisticas(forms);

    return response.render('index', {
      estatisticasFormularios,
      forms,
    });
  }

  @Get(':id')
  getForm(@Param('id', ParseIntPipe) id: number) {
    return this.formulariosService.getForm(id);
  }

  @Patch(':id')
  updateForm(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formulariosService.updateForm(+id, updateFormularioDto);
  }

  @Delete(':id')
  deleteForm(
    @Param('id', ParseIntPipe) id: number,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formulariosService.deleteForm(id, headers);
  }
}
