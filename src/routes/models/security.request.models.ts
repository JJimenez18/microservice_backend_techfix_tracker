import { Request } from 'express';

export interface IGeneraToken extends Request {
  body: {
    username: string;
    password: string;
  };
}
