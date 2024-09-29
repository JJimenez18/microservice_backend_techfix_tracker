/* eslint-disable max-len */
import { Response, Request } from 'express';
import { IAddressUsersPost } from '../models/users.models';
import { middlewareResponse } from '../../helpers/ayudas';
import {
  devicesPostServices, devicesTiposGetServices, failuresDevicePostServices, failuresEvidenceDevicePostServices, usernameDeviceGetServices,
} from '../services/device.services';
import { IDispositivo } from '../models/device.models';

export class DeviceController {
  public devicesGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { idDevice } = solicitud.params;
    const { statusCode, data } = await usernameDeviceGetServices({ ...solicitud.body, idDispositivo: Number(idDevice) ?? null });
    return middlewareResponse({ respuesta, statusCode, dataResponse: { devices: data } });
  };
  public devicesTiposGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await devicesTiposGetServices();
    return middlewareResponse({ respuesta, statusCode, dataResponse: { devicesTypes: data } });
  };

  public devicesPost = async (solicitud: IDispositivo, respuesta: Response): Promise<Response> => {
    const { statusCode, details } = await devicesPostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode, mensaje: details });
  }

  public devicesPut = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await usernameDeviceGetServices(solicitud.body);
    return middlewareResponse({ respuesta, statusCode, dataResponse: { devices: data } });
  };

  public failuresDevicePost = async (solicitud: IAddressUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode } = await failuresDevicePostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };

  public failuresEvidenceDevicePost = async (solicitud: IAddressUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode } = await failuresEvidenceDevicePostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };
}
