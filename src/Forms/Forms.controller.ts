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
  Req,
  ParseIntPipe,
  UnauthorizedException,
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
    @Req() request: Request,
  ) {
    const authHeader = request.headers['authorization'];

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      return this.formsService.createForms(createFormularioDto, token);
    } else {
      throw new UnauthorizedException('Token nao valido');
    }
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  async getForms() {
    return await this.formsService.getForms();
  }

  @Get(':id')
  async getForm(@Param('id', ParseIntPipe) id: number) {
    return await this.formsService.getForm(id);
  }

  @Patch(':id')
  async updateForm(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return await this.formsService.updateForm(+id, updateFormularioDto);
  }

  @Delete(':id')
  deleteForm(@Param('id', ParseIntPipe) id: number) {
    return this.formsService.deleteForm(id);
  }
}
