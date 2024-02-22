import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';

@Controller('formularios')
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  create(@Body() createFormularioDto: CreateFormularioDto) {
    return this.formulariosService.create(createFormularioDto);
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  findAll() {
    return this.formulariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(+id);
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
