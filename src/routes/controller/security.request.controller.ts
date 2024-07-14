import { exitoApi } from '@chtalent/apis-common';
import { Response } from 'express';
import { IGeneraToken } from '../models/security.request.models';
import { validaErrores } from '../../helpers/ayudas';
import { generaTokenServices } from '../services/security.request.services';

export class SecurityController {
  public tokenGenerate = async (solicitud: IGeneraToken, respuesta: Response): Promise<Response> => {
    const { codigoHttp, resultado } = await generaTokenServices({ ...solicitud.body });
    if (![200].includes(codigoHttp) || !resultado) {
      return validaErrores({ codigoHttp });
    }
    return exitoApi.creado(respuesta, { token: resultado.token });
  };

  // eslint-disable-next-line max-len
  public verificaTtokenGenerate = async (solicitud: IGeneraToken, respuesta: Response): Promise<Response> => exitoApi.creado(respuesta);
}
