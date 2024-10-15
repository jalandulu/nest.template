import { Hash } from 'src/common/helpers';
import { IUpdateIdentityCredentialDto } from 'src/cores/interfaces/dtos';

export class UpdateIdentityCredentialDto
  implements IUpdateIdentityCredentialDto
{
  username?: string;
  password?: string;

  constructor(payload: IUpdateIdentityCredentialDto) {
    this.username = payload.username;
    this.password = payload.password;
  }

  async hashPassword() {
    if (!this.password) return undefined;

    return await Hash.make(this.password);
  }
}