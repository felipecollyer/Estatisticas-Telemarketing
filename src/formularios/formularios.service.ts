import { Injectable } from '@nestjs/common';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { separateForms } from './Handlers/SeparateForms';

@Injectable()
export class FormulariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFormularioDto: CreateFormularioDto) {
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

    return { forms };
  }

  async findAll(body) {
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

  findOne() {
    return `This action returns a formulario`;
  }

  async updateForm(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  async remove(id: number) {
    const usuario_id = 1;

    try {
      const x = await this.prisma.formulario.delete({
        where: { id, usuario_id },
      });
      return {
        formDeleted,
      };
    } catch (formDeleted) {
      return { error: formDeleted };
    }
  }
}
