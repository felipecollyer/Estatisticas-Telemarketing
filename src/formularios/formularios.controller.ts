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
  create(
    @Body() createFormularioDto: CreateFormularioDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formulariosService.Create(createFormularioDto, headers);
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  async readDay(@Body() body, @Res() response: Response) {
    const data = await this.formulariosService.ReadAllDay(body);

    const { forms } = data;

    const estatisticasFormularios = gerarEstatisticas(forms);

    return response.render('index', {
      estatisticasFormularios,
      forms,
    });
  }

  @Get(':id')
  readOneForm(@Param('id', ParseIntPipe) id: number) {
    return this.formulariosService.FindOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formulariosService.update(+id, updateFormularioDto);
  }

  @Delete(':id')
  removeOne(
    @Param('id', ParseIntPipe) id: number,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formulariosService.deleteOne(id, headers);
  }
}
