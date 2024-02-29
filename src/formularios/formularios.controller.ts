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
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  create(
    @Body() createFormularioDto: CreateFormularioDto,
    @Headers() headers: Record<string, string>,
  ) {
    // Aqui você pode ver os cabeçalhos HTTP
    return this.formulariosService.create(createFormularioDto, headers);
  }

  @UseInterceptors(LogInterceptor)
  @Get('visualizar')
  findAll(
    @Query('atendente', ParseIntPipe) atendente: number,
    @Query('dia') dia: string,
  ) {
    return this.formulariosService.findAll(atendente, dia);
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
