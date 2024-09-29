import { Request } from 'express';

export interface clientsGET {
  idUsuario: number;
  nombreUsuario: string;
  nombre: string;
  telefono: string;
  fechaRegistro: string;
}

export interface clientsPostReq extends Request {
  body: clientsPOST;
}

export interface clientsPOST {
  nombre: string;
  telefono: string;
}
