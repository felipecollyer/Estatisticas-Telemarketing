import { Injectable, Param, Query } from '@nestjs/common';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { separateForms } from './Handlers/SeparateForms';

@Injectable()
export class FormulariosService {
  constructor(private readonly prisma: PrismaService) {}

  async Create(createFormularioDto: CreateFormularioDto, headers) {
    const forms = await this.prisma.formulario.create({
      data: {
        nome_formulario: createFormularioDto.nome_formulario,
        codigo_cliente: createFormularioDto.codigo_cliente,
        razao_social: createFormularioDto.razao_social,
        agendamento: createFormularioDto.agendamento,
        tipo_agendamento: createFormularioDto.tipo_agendamento,
        ciclo_agendamento: createFormularioDto.ciclo_agendamento,
        usuario_id: headers,
      },
    });

    return { forms };
  }

  async ReadAllDay(body) {
    const { usuario_id, agendamento, data } = body;

    const findData = new Date(data);
    let foundForms = [];

    if (agendamento === '24' || agendamento === '48') {
      foundForms = await this.prisma.formulario.findMany({
        where: {
          usuario_id: usuario_id,
          agendamento: agendamento,
          created_at: {
            gte: findData,
          },
        },
      });
    } else {
      foundForms = await this.prisma.formulario.findMany({
        where: {
          usuario_id: usuario_id,
          created_at: {
            gte: findData,
          },
        },
      });
    }

    const forms = separateForms(foundForms);

    return { agendamento, forms };
  }

  async FindOne(id) {
    const foundForm = await this.prisma.formulario.findUnique({
      where: { id: id },
    });
    return { foundForm };
  }

  update(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  async deleteOne(id, headers) {
    const idHeader = parseInt(headers.id);

    try {
      const formDeleted = await this.prisma.formulario.delete({
        where: { id: id, usuario_id: idHeader },
      });
      return {
        formDeleted,
      };
    } catch (formDeleted) {
      return { error: formDeleted };
    }
  }
}
