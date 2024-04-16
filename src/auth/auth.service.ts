import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register-dto';
import { UsersService } from 'src/Users/Users.Service';
import { CriarUsuarioDTO } from 'src/Users/dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  async createToken(user: Usuario) {
    return {
      token: this.jwtService.sign(
        {
          id: user.id,
          acess: user.access,
          email: user.email,
        },
        {
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token) {
    try {
      const data = this.jwtService.verify(token);
      if (data) {
        return data;
      }
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.createUser(data);

    return this.createToken({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      access: user.access,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async approveUser(id, acessUser, token) {
    const { acess } = await this.checkToken(token);
    const data = { access: acessUser };

    if (acess === 'admin') {
      const NewDataUpdate = await this.prisma.usuario.update({
        data,
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          access: true,
        },
      });
      return { NewDataUpdate };
    }
  }

  async forget(email: string) {
    const user = await this.prisma.usuario.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email esta incorretos.');
    }

    return user;
  }

  async reset(password: string, token: string) {
    const id = 0;

    const user = await this.prisma.usuario.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }
}
