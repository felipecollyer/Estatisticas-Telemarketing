import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDTO } from './create.usuario.dto';

export class UpdatePatchUsuarioDTO extends PartialType(CriarUsuarioDTO) {}
