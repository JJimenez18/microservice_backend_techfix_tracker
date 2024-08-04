import { exitoApi } from '@chtalent/apis-common';
import { Response } from 'express';
import { IGeneraToken } from '../models/security.request.models';
import { middlewareResponse } from '../../helpers/ayudas';
import { generaTokenServices } from '../services/security.request.services';

export class SecurityController {
  public tokenGenerate = async (solicitud: IGeneraToken, respuesta: Response): Promise<Response> => {
    const { statusCode, data, details } = await generaTokenServices({ ...solicitud.body });
    return middlewareResponse({
      respuesta, statusCode, mensaje: details, dataResponse: { token: data.token },
    });
  };

  // eslint-disable-next-line max-len
  public verificaTtokenGenerate = async (solicitud: IGeneraToken, respuesta: Response): Promise<Response> => exitoApi.creado(respuesta);
}
