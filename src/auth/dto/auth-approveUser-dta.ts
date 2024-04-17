import { IsString } from 'class-validator';

export class ApproveUserDTO {
  @IsString()
  id: string;

  @IsString()
  accessGranted: string;
}
