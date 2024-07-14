/* eslint-disable max-len */
import { errorApi } from '@chtalent/apis-common';
import { Response } from 'express';
import { EMensajesError } from '../enums/general.enum';

export const delay = async (ms:any) => new Promise((resolve) => setTimeout(resolve, ms));

export const calcularMontoRedUnica = (precioUnitario:number):number => {
  const porcentaje = 0;
  const aumento = (precioUnitario * porcentaje);
  const precio = (precioUnitario + aumento);
  return Number(precio.toFixed(2));
};
export const calcularTiempoEjecucion = (param: { inicio: number, final: number }) => Math.trunc(param.final - param.inicio);

export const formatearErrorApi = (detalles?: any[]): string | undefined => {
  if (!detalles || !Array.isArray(detalles)) {
    return undefined;
  }
  if (detalles.every((d) => typeof d === 'string')) {
    return detalles.toString();
  }
  if (detalles.every((d) => typeof d === 'object')) {
    const mensajes: string[] = [];
    detalles.forEach((d) => mensajes.push(Object.values(d).toString()));
    return mensajes.toString();
  }

  return '';
};

export const validaErrores = async (
  data: {
        codigoHttp: number,
        mensaje?: string,
    },
): Promise<Response> => {
  const { codigoHttp, mensaje } = data;
  switch (codigoHttp) {
    case 401: throw errorApi.peticionNoAutorizada.parametrosNoValidos(mensaje || EMensajesError.NOT_AUTH);
    case 403: throw errorApi.peticionInvalida.peticionNoAutorizada(mensaje || EMensajesError.FORBIDDEN);
    case 400: throw errorApi.peticionNoValida.parametrosNoValidos(mensaje || EMensajesError.BAD_REQ);
    case 404: throw errorApi.recursoNoEncontrado.recursoBDNoEncontrado(mensaje || EMensajesError.NOT_FOUND);
    default: throw errorApi.errorInternoServidor.desconocido(mensaje || EMensajesError.ERROR);
  }
};
