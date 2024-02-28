// src/formulario/dto/create-formulario.dto.ts
import { IsString, IsNumber } from 'class-validator';

export class CreateFormularioDto {
  @IsString()
  readonly nome_formulario: string;

  @IsNumber()
  readonly codigo_cliente: number;

  @IsString()
  readonly razao_social: string;

  @IsString()
  readonly agendamento: string;

  @IsString()
  readonly tipo_agendamento: string;

  @IsString()
  readonly ciclo_agendamento: string;
}
