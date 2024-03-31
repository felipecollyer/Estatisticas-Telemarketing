import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CriarUsuarioDTO,
  UpdatePutUsuarioDTO,
  UpdatePatchUsuarioDTO,
  LoginUserDTO,
} from './dto/index';
import { ValidePassword } from './Handlers/ValidatePassword';
import { errorMessages } from './errorMessages';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CriarUsuarioDTO) {
    const passwordsMatch = ValidePassword(data);

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

      const newUser = await this.prisma.usuario.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.email,
        },
      });

      if (!newUser) {
        throw new Error(errorMessages.FAILED_TO_CREATE_USER);
      } else {
        return {
          name: newUser.name,
          email: newUser.email,
          msg: 'Registrado com sucesso',
        };
      }
    } catch (error) {
      return { Erro: `${error.message}` };
    }
  }

  async Login(data: LoginUserDTO) {
    try {
      const user = await this.prisma.usuario.findFirst({
        where: { email: data.email },
      });

      if (!user || user.password !== data.password) {
        throw new Error(errorMessages.FAILED_TO_LOGIN);
      }
    } catch (error) {
      return { Erro: `${error.message}` };
    }
    return data;
  }

  async getUser(id: number) {
    try {
      if (id <= 0) {
        throw new Error(errorMessages.ID_INVALID);
      }

      const user = await this.prisma.usuario.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw new Error(errorMessages.FAILED_TO_USER);
      }

      return user;
    } catch (error) {
      return { Erro: `${error.message}` };
    }
  }

  async getAllUsers() {
    try {
      const foundUsers = await this.prisma.usuario.findMany({
        select: {
          name: true,
          email: true,
          id: true,
        },
      });

      return foundUsers;
    } catch (error) {
      console.error(errorMessages.FAILED_IN_SEARCH);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async UpdateAllData(id: number, data: UpdatePutUsuarioDTO) {
    const newDataUpdade = await this.prisma.usuario.update({
      data,
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      newDataUpdade,
    };
  }

  async UpdatePartialsData(id: number, data: UpdatePatchUsuarioDTO) {
    try {
      const checkIdExist = await this.prisma.usuario.findFirst({
        where: {
          id,
        },
      });
      if (!checkIdExist) {
        throw new Error(errorMessages.FAILED_TO_USER);
      }

      const NewDataUpdate = await this.prisma.usuario.update({
        data,
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!NewDataUpdate) {
        throw new Error(errorMessages.FAILED_TO_UPDATE_USER);
      }

      return NewDataUpdate;
    } catch (error) {
      return `${error.message}`;
    }
  }

  async deleteUser(id) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        id: id,
      },
    });

    if (!usuario) {
      throw new NotFoundException(errorMessages.FAILED_TO_USER);
    }

    const userDeleted = await this.prisma.usuario.delete({
      where: {
        id: usuario.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return { msg: `Usuario ${userDeleted.name} deletado.` };
  }
}
