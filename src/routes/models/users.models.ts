import { Request } from 'express';

export interface IUsersPost extends Request {
  body: IDetalleUsuario;
}

export interface IDetalleUsuario {
  nombre: string;
  telefono: string;
  correoElectronico: string;
  contrasenia: string;
  nombreUsuario: string;
}

export interface IUserNameGet extends Request {
  query: {
    nombreUsuario: string;
  };
}

export interface IAddressUsersPost extends Request {
  body: IAddressUsers;
}

export interface IAddressUsers {
  idUsuario: number;
  nombreUsuario: string;
  calle: string;
  numeroInterior: string;
  numeroExterior: string;
  codigoPostal: string;
  referencias: string;
}
