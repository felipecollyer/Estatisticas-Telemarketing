import { Injectable, Param, Query } from '@nestjs/common';

import { CreateFormularioDto } from './dto/create-formulario.dto';

import { UpdateFormularioDto } from './dto/update-formulario.dto';

import { PrismaService } from 'src/prisma/prisma.service';

import { Estatisticas_por_agendamento } from './Handlers/Estatisticas_por_agendamento';

import { buscarFormularios } from './Handlers/BuscarFormularios';

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
    const Data_inicio = new Date(body.data_inicial);
    const Data_final = new Date(body.data_final);

    const formularios = await this.prisma.formulario.findMany({
      where: {
        usuario_id: body.token_usuario,
        created_at: {
          gte: Data_inicio,
          lt: Data_final,
        },
      },
    });

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

    const Estatisticas = {
      usuario_id: body.token_usuario,

      agendamento_24,
      agendamento_48,
    };

    return { Estatisticas };
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
