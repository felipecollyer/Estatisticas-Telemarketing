import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CriarUsuarioDTO,
  UpdatePutUsuarioDTO,
  UpdatePatchUsuarioDTO,
} from './dto/index';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CriarUsuarioDTO) {
    return this.prisma.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async readOne() {
    return this.prisma.usuario.findMany();
  }

  async readAll(id) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdatePutUsuarioDTO) {
    console.log({ data });
    return this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async updatePartials(id: number, data: UpdatePatchUsuarioDTO) {
    console.log({ data });
    return this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete({ id }) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
