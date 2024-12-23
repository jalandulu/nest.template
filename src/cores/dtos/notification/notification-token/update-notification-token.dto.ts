import {
  ICreateNotificationTokenDto,
  IUpdateNotificationTokenDto,
} from 'src/cores/interfaces/dtos';

export class UpdateNotificationTokenDto implements IUpdateNotificationTokenDto {
  userId?: ICreateNotificationTokenDto['userId'];
  type?: ICreateNotificationTokenDto['type'];
  token?: ICreateNotificationTokenDto['token'];

  constructor(payload: IUpdateNotificationTokenDto) {
    Object.assign(this, payload);
  }
}
