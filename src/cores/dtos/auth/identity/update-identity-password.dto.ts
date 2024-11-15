import { Hash } from 'src/common/helpers';
import { IUpdateIdentityPasswordDto } from 'src/cores/interfaces/dtos';

export class UpdateIdentityPasswordDto implements IUpdateIdentityPasswordDto {
  currentPassword: string;
  password: string;

  constructor(payload: IUpdateIdentityPasswordDto) {
    this.currentPassword = payload.currentPassword;
    this.password = payload.password;
  }

  get hashPassword(): Promise<string> {
    return Hash.make(this.password);
  }
}
