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
import { FormsService } from './Forms.service';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Response } from 'express';
import { gerarEstatisticas } from './Handlers/GerarEstatisticas';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  createForms(
    @Body() createFormularioDto: CreateFormularioDto,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formsService.createForms(createFormularioDto, headers);
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  async getForms(@Body() body, @Res() response: Response) {
    const data = await this.formsService.getForms(body);

    const { forms } = data;

    const estatisticasFormularios = gerarEstatisticas(forms);

    return response.render('index', {
      estatisticasFormularios,
      forms,
    });
  }

  @Get(':id')
  getForm(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.getForm(id);
  }

  @Patch(':id')
  updateForm(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return this.formsService.updateForm(+id, updateFormularioDto);
  }

  @Delete(':id')
  deleteForm(
    @Param('id', ParseIntPipe) id: number,
    @Headers() headers: Record<string, string>,
  ) {
    return this.formsService.deleteForm(id, headers);
  }
}
