import { Request } from 'express';
import { IAltaDispositivo } from '../../database/mysql/models/input';

export interface IDispositivo extends Request {
  body: IAltaDispositivo;
}

export interface IAltaFallaDispositivo extends Request {
  body: IDetallaFalla
}

export interface IDetallaFalla {
  folio: string;
  idTecnicoRegistra: string;
  nombreUsuario: string;
  fallas: IDetalleAlta[];
}

export interface IDetalleAlta {
  descripcion: string;
  reparacionSugerida: string;
}

export interface IAltaFallaDispositivoSP extends IDetalleAlta {
  folio: string;
  idTecnicoRegistra: string;
}
