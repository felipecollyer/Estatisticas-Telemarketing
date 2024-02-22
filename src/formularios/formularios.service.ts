import { Injectable } from '@nestjs/common';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HandlersIndex } from './Handlers/index';
import { Estatisticas_por_agendamento } from './Handlers/Estatisticas_por_agendamento';

@Injectable()
export class FormulariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFormularioDto: CreateFormularioDto) {
    return 'This action adds a new formulario';
  }

  async findAll() {
    const formularios = await this.prisma.formulario.findMany();

    const formulario_24 = [];
    const formulario_48 = [];

    formularios.forEach((formulario) => {
      if (formulario.agendamento === '24') {
        formulario_24.push(formulario);
      } else if (formulario.agendamento === '48') {
        formulario_48.push(formulario);
      }
    });

    const agendamento_24 = Estatisticas_por_agendamento(formulario_24);
    const agendamento_48 = Estatisticas_por_agendamento(formulario_48);

    return { agendamento_24, agendamento_48 };
  }

  findOne(id: number) {
    return `This action returns a #${id} formulario`;
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  remove(id: number) {
    return `This action removes a #${id} formulario`;
  }
}
