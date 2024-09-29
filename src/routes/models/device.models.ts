import { Request } from 'express';
import { IAltaDispositivo } from '../../database/mysql/models/input';

export interface IDispositivo extends Request {
  body: IAltaDispositivo;
}
