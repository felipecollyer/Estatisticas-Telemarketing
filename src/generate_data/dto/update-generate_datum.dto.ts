import { PartialType } from '@nestjs/mapped-types';
import { CreateGenerateDatumDto } from './create-generate_datum.dto';

export class UpdateGenerateDatumDto extends PartialType(CreateGenerateDatumDto) {}
