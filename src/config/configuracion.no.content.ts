/* eslint-disable max-len */
import { Utilerias } from '@chtalent/apis-common';
import { Response } from 'express';
import { EMensajesError } from '../enums/general.enum';

interface IRespApi {
  mensaje: string;
  folio: string;
  resultado?: unknown;
}

interface IOpcionesExito {
  sinContenido: (respuesta: Response, codigoInterno?: number) => Response<IRespApi>;
}

const respuestaNoContent = (respuesta: Response, codigo: number, codigoInterno: number): Response<IRespApi> => {
  const xCodigo = `${codigo}.${process.env.API_NOMBRE}.${codigoInterno}`;
  respuesta.setHeader('x-codigo', xCodigo);
  respuesta.setHeader('x-mensaje', 'Operación Exitosa, no se encontró información.');
  respuesta.setHeader('x-folio', Utilerias.generarFolio());
  respuesta.setHeader('x-info', `${process.env.API_LIGA_ERRORES}${codigo}`);
  respuesta.setHeader('x-detalle', EMensajesError.NOT_FOUND);
  return respuesta.status(204).send();
};

export const exitoApi2: IOpcionesExito = {
  sinContenido: (respuesta: Response, codigoInterno?: number) => respuestaNoContent(respuesta, 204, codigoInterno || 204000),
};
