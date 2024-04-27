import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CriarUsuarioDTO,
  UpdatePutUsuarioDTO,
  UpdatePatchUsuarioDTO,
  LoginUserDTO,
} from './dto/index';
import { ValidetePassword } from './Handlers/ValidatePassword';
import { errorMessages } from './errorMessages';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CriarUsuarioDTO) {
    const passwordsMatch = ValidetePassword(data);

    try {
      if (!passwordsMatch) {
        throw new Error(errorMessages.PASSWORDS_DO_NOT_MATCH);
      }

      const existingEmail = await this.prisma.usuario.findFirst({
        where: { email: data.email },
      });

      if (existingEmail) {
        throw new Error(errorMessages.EMAIL_ALREADY_REGISTERED);
      }

      const access = (await this.prisma.usuario.count()) ? 'pendente' : 'admin';

      const newUser = await this.prisma.usuario.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          access,
        },
      });

      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(data: LoginUserDTO) {
    try {
      const user = await this.prisma.usuario.findFirst({
        where: { email: data.email },
      });

      if (!user || user.password !== data.password) {
        throw new Error(errorMessages.FAILED_TO_LOGIN);
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUser(id: number) {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        throw new NotFoundException(errorMessages.FAILED_TO_USER);
      }

      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllUsers() {
    try {
      return await this.prisma.usuario.findMany({
        select: { name: true, email: true, id: true },
      });
    } catch (error) {
      throw new Error(errorMessages.FAILED_IN_SEARCH);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async updateAllData(id: number, data: UpdatePutUsuarioDTO) {
    try {
      const newDataUpdate = await this.prisma.usuario.update({
        data,
        where: { id },
        select: { id: true, name: true, email: true },
      });

      return newDataUpdate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updatePartialsData(id: number, data: UpdatePatchUsuarioDTO) {
    try {
      const checkIdExist = await this.prisma.usuario.findFirst({
        where: { id },
      });

      if (!checkIdExist) {
        throw new NotFoundException(errorMessages.FAILED_TO_USER);
      }

      const newDataUpdate = await this.prisma.usuario.update({
        data,
        where: { id },
        select: { id: true, name: true, email: true },
      });

      return newDataUpdate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.usuario.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(errorMessages.FAILED_TO_USER);
      }

      await this.prisma.usuario.delete({
        where: { id: user.id },
      });

      return { msg: `Usuario ${user.name} deletado.` };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
