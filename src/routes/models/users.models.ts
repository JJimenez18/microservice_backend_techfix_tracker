import { Request } from 'express';

export interface IUsersPost extends Request {
  body: IDetalleUsuario
}

export interface IDetalleUsuario {
  nombre: string;
  telefono: string;
  email: string;
  contrasenia: string;
  userName?: string,
}
