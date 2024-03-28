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

  async Create(data: CriarUsuarioDTO) {
    return this.prisma.usuario.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async FindOne(id: number) {
    return this.prisma.usuario.findUnique({ where: { id: id } });
  }

  async FindAll() {
    return this.prisma.usuario.findMany();
  }

  async UpdateAllData(id: number, data: UpdatePutUsuarioDTO) {
    return this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async UpdatePartialsData(id: number, data: UpdatePatchUsuarioDTO) {
    console.log({ data });
    return this.prisma.usuario.update({
      data,
      where: {
        id,
      },
    });
  }

  async deleteOneUser({ id }) {
    return this.prisma.usuario.delete({ where: { id } });
  }
}
