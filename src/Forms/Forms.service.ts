import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFormularioDto, UpdateFormularioDto } from './dto/index';
import { PrismaService } from 'src/prisma/prisma.service';
import { separateForms } from './Handlers/SeparateForms';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FormsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createForms(createFormularioDto: CreateFormularioDto, token) {
    const data = await this.authService.checkToken(token);

    if (data.acess === 'pos-venda') {
      const forms = await this.prisma.formulario.create({
        data: {
          nome_formulario: createFormularioDto.nome_formulario,
          codigo_cliente: createFormularioDto.codigo_cliente,
          razao_social: createFormularioDto.razao_social,
          agendamento: createFormularioDto.agendamento,
          tipo_agendamento: createFormularioDto.tipo_agendamento,
          ciclo_agendamento: createFormularioDto.ciclo_agendamento,
          usuario_id: data.id,
        },
      });
      return { forms };
    } else {
      throw new UnauthorizedException('Acesso negado.');
    }
  }

  async getForms(body) {
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

  async getForm(id) {
    const foundForm = await this.prisma.formulario.findUnique({
      where: { id: id },
    });
    return { foundForm };
  }

  async updateForm(id: number, updateFormularioDto: UpdateFormularioDto) {
    return `This action updates a #${id} formulario`;
  }

  async deleteForm(id, headers) {
    const id_user = parseInt(headers.id_user);

    try {
      const formDeleted = await this.prisma.formulario.delete({
        where: { id: id, usuario_id: id_user },
      });
      return {
        formDeleted,
      };
    } catch (formDeleted) {
      return { error: formDeleted };
    }
  }
}
