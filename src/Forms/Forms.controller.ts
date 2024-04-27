import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FormsService } from './Forms.service';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
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
      throw new UnauthorizedException('Token não válido');
    }
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  async getForms() {
    return await this.formsService.getForms();
  }

  @Get(':id')
  async getForm(@Param('id') id: string) {
    return await this.formsService.getForm(+id);
  }

  @Patch(':id')
  async updateForm(
    @Param('id') id: string,
    @Body() updateFormularioDto: UpdateFormularioDto,
  ) {
    return await this.formsService.updateForm(+id, updateFormularioDto);
  }

  @Delete(':id')
  deleteForm(@Param('id') id: string) {
    return this.formsService.deleteForm(+id);
  }
}
