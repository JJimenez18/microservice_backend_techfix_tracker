/* eslint-disable max-len */
import { Response, Request } from 'express';
import { IAddressUsersPost, IUserNameGet, IUsersPost } from '../models/users.models';
import {
  addressUsersPostServices,
  usernameAddressGetServices,
  usernameAddressIDDeleteServices,
  usernameAddressIDGetServices,
  userNamePostServices,
  usersPostServices,
} from '../services/users.services';
import { middlewareResponse } from '../../helpers/ayudas';

export class UsersController {
  public userPost = async (solicitud: IUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode, details } = await usersPostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode, mensaje: details });
  }

  public usernameGet = async (solicitud: IUserNameGet, respuesta: Response): Promise<Response> => {
    const { statusCode } = await userNamePostServices(solicitud.query.nombreUsuario);
    return middlewareResponse({ respuesta, statusCode, mensaje: 'El nombre de usuario proporcionado no esta disponible' });
  };

  public addressUsersGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await usernameAddressGetServices(solicitud.body.nombreUsuario);
    return middlewareResponse({ respuesta, statusCode, dataResponse: { address: data } });
  };

  public addressUsersPOST = async (solicitud: IAddressUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode } = await addressUsersPostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };

  public addressIDUsersGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { params, body } = solicitud;
    const { statusCode, data } = await usernameAddressIDGetServices(body.nombreUsuario, Number(params.idDireccion));
    return middlewareResponse({ respuesta, statusCode, dataResponse: { address: data } });
  };

  public addressIDUsersDelete = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { params, body } = solicitud;
    const { statusCode } = await usernameAddressIDDeleteServices(body.nombreUsuario, Number(params.idDireccion));
    return middlewareResponse({ respuesta, statusCode });
  };
}
