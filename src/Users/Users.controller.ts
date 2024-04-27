import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import {
  CriarUsuarioDTO,
  LoginUserDTO,
  UpdatePatchUsuarioDTO,
  UpdatePutUsuarioDTO,
} from './dto/index';
import { UsersService } from './Users.Service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(LogInterceptor)
  @Post('register')
  async registerUser(@Body() criarUsuarioDto: CriarUsuarioDTO) {
    return this.usersService.createUser(criarUsuarioDto);
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDTO) {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  async updateUser(
    @Body() updatePutUsuarioDto: UpdatePutUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updateAllData(id, updatePutUsuarioDto);
  }

  @Patch(':id')
  async updatePartialUser(
    @Body() updatePatchUsuarioDto: UpdatePatchUsuarioDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.updatePartialsData(id, updatePatchUsuarioDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
