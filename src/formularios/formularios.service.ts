import { Injectable, Param, Query } from '@nestjs/common';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { separarFormulario } from './Handlers/SepararFormulario';

@Injectable()
export class FormulariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFormularioDto: CreateFormularioDto, headers) {
    const Formulario = await this.prisma.formulario.create({
      data: {
        nome_formulario: createFormularioDto.nome_formulario,


        codigo_cliente: createFormularioDto.codigo_cliente,


        razao_social: createFormularioDto.razao_social,


        agendamento: createFormularioDto.agendamento,


        tipo_agendamento: createFormularioDto.tipo_agendamento,


        ciclo_agendamento: createFormularioDto.ciclo_agendamento,


        usuario_id: 2,
      },
    });

    return `Formulario Salvo com sucesso.`;
  }

  async findAll(body) {
    const { usuario_id, agendamento, data } = body;

    const dataBody = new Date(data);
    let formulariosEncontrados = [];

    if (agendamento === '24' || agendamento === '48') {
      formulariosEncontrados = await this.prisma.formulario.findMany({
        where: {
          usuario_id: usuario_id,
          agendamento: agendamento,
          created_at: {
            gte: dataBody,
          },
        },
      });
    } else {
      formulariosEncontrados = await this.prisma.formulario.findMany({
        where: {
          usuario_id: usuario_id,
          created_at: {
            gte: dataBody,
          },
        },
      });
    }

    const formularios = separarFormulario(formulariosEncontrados);

    return { agendamento, formularios };
  }

  findOne() {
    return `This action returns a formulario`;
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  async remove(id: number) {
    const usuario_id = 1;

    try {
      const x = await this.prisma.formulario.delete({
        where: { id, usuario_id },
      });
    } catch (x) {
      return { error: x };
    }

    return `This action removes a #${id} formulario`;
  }
}
