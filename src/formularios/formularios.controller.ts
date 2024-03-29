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
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Response } from 'express';

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
  async findAll(@Body() body, @Res() res: Response) {
    const { Estatisticas } = await this.formulariosService.findAll(body);

    const { Com_Pedido, Sem_Pedido, Sem_Retorno } = Estatisticas.agendamento_24;
    const { ClienteSemPedido } = Estatisticas.agendamento_24.Sem_Pedido;
    const { ClienteSemRetorno } = Estatisticas.agendamento_24.Sem_Retorno;

    return res.render('index', {
      Com_Pedido,
      Sem_Pedido,
      Sem_Retorno,
      ClienteSemPedido,
      ClienteSemRetorno,
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
