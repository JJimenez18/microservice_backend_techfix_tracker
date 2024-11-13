/* eslint-disable max-len */
import { Response, Request } from 'express';
import { IAddressUsersPost } from '../models/users.models';
import { middlewareResponse } from '../../helpers/ayudas';
import {
  devicesPostServices,
  devicesTiposGetServices,
  failuresDeviceGetservices,
  failuresDevicePostServices,
  failuresEvidenceDevicePostServices,
  usernameDeviceGetServices,
} from '../services/device.services';
import { IAltaFallaDispositivo, IDispositivo } from '../models/device.models';
import { IConsultaFallasDispositivos } from '../../database/mysql/models/output';

export class DeviceController {
  public devicesGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { idDevice } = solicitud.params;
    const { statusCode, data } = await usernameDeviceGetServices({
      ...solicitud.body,
      idDispositivo: idDevice ?? null,
    });
    let fallas: IConsultaFallasDispositivos[] = [];
    if (idDevice) {
      const { data: fallasFilter } = await failuresDeviceGetservices(idDevice);
      fallas = fallasFilter;
    }

    return middlewareResponse({ respuesta, statusCode, dataResponse: { devices: data, fallas } });
  };
  public devicesTiposGet = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await devicesTiposGetServices();
    return middlewareResponse({ respuesta, statusCode, dataResponse: { devicesTypes: data } });
  };

  public devicesPost = async (solicitud: IDispositivo, respuesta: Response): Promise<Response> => {
    const { statusCode, details, data } = await devicesPostServices({ ...solicitud.body });
    return middlewareResponse({
      respuesta,
      statusCode,
      mensaje: details,
      dataResponse: data,
    });
  };

  public devicesPut = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    const { statusCode, data } = await usernameDeviceGetServices(solicitud.body);
    return middlewareResponse({ respuesta, statusCode, dataResponse: { devices: data } });
  };

  public failuresDevicePost = async (solicitud: IAltaFallaDispositivo, respuesta: Response): Promise<Response> => {
    const { statusCode } = await failuresDevicePostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };

  public failuresEvidenceDevicePost = async (solicitud: IAddressUsersPost, respuesta: Response): Promise<Response> => {
    const { statusCode } = await failuresEvidenceDevicePostServices({ ...solicitud.body });
    return middlewareResponse({ respuesta, statusCode });
  };
}
