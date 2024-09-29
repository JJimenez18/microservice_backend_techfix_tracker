/* eslint-disable max-len */
import { Response, Request } from 'express';
import { IAddressUsersPost } from '../models/users.models';
import { middlewareResponse } from '../../helpers/ayudas';
import {
  clientsPostServices, addressClientsPostServices, clientsAddressIDGetServices, clientsAddressIDDeleteServices,
  clientsGetServices,
  clientsAddressGetServices,
} from '../services/clients.services';
import { clientsPostReq } from '../models/clients.models';

export class ClientsController {
  public clientsGET = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, details, data } = await clientsGetServices();
    return middlewareResponse({
      respuesta, statusCode, mensaje: details, dataResponse: { clients: data },
    });
  }

  public clientsPost = async (solicitud: clientsPostReq, respuesta: Response): Promise<Response> => {
    const { statusCode, details } = await clientsPostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode, mensaje: details });
  }

  public addressClientsGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await clientsAddressGetServices(solicitud.params.idUsuario);
    return middlewareResponse({ respuesta, statusCode, dataResponse: { address: data } });
  };

  public addressIDClientsGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { params } = solicitud;
    const { statusCode, data } = await clientsAddressIDGetServices(solicitud.params.idUsuario, Number(params.idDireccion));
    return middlewareResponse({ respuesta, statusCode, dataResponse: { address: data } });
  };

  public addressClientsPOST = async (solicitud: IAddressUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode } = await addressClientsPostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };

  public addressIDUsersDelete = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { params } = solicitud;
    const { statusCode } = await clientsAddressIDDeleteServices(Number(params.idDireccion));
    return middlewareResponse({ respuesta, statusCode });
  };
}
