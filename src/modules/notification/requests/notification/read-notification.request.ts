import { PickType } from '@nestjs/swagger';
import { QueryNotifiableRequest } from './query-notifiable.request';

export class ReadNotificationRequest extends PickType(QueryNotifiableRequest, [
  'notifiableType',
  'notifiableType',
]) {}
