/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { MetodosBD } from '../../database/mysql/methods';
import { IAltaDispositivo, IConsultaDispositivos, IConsultaTiposDispositivos } from '../../database/mysql/models/input';
import {
  IConsultaDispositivosO,
  IConsultaFallasDispositivos,
  IRespDBGenericaO,
} from '../../database/mysql/models/output';
import { IRespGen } from '../../models/general';
import { IAltaFallaDispositivoSP, IDetallaFalla } from '../models/device.models';
import { IAddressUsers } from '../models/users.models';

const bd = MetodosBD.getInstance();

export const devicesPostServices = async (data: IAltaDispositivo): Promise<IRespGen<{ uuid: string }>> => {
  const uuid = uuidv4();
  await bd.registroDispositivos({ ...data, uuid });
  return {
    data: { uuid },
    details: 'ok',
    statusCode: 201,
  };
};

export const devicesTiposGetServices = async (): Promise<IRespGen<IConsultaTiposDispositivos[]>> => {
  const usuario = await bd.consultaTiposDispositivos();
  return usuario;
};

export const usernameDeviceGetServices = async (
  data: IConsultaDispositivos,
): Promise<IRespGen<IConsultaDispositivosO[]>> => {
  const resp = await bd.ConsultaDispositivos(data);
  return resp;
};

export const failuresDevicePostServices = async (data: IDetallaFalla): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const detalle: IAltaFallaDispositivoSP[] = data.fallas.map((x) => ({
    descripcion: x.descripcion,
    folio: data.folio,
    idTecnicoRegistra: data.nombreUsuario,
    reparacionSugerida: x.reparacionSugerida,
  }));
  // eslint-disable-next-line no-restricted-syntax
  for await (const x of detalle) {
    console.log(x);
    await bd.registroFallaDispositivo(x);
  }
  return {
    data: [],
    details: 'ok',
    statusCode: 200,
  };
};

export const failuresDeviceGetservices = async (
  idDispositivo: string,
): Promise<IRespGen<IConsultaFallasDispositivos[]>> => {
  const resp = await bd.consultaFallaDispositivo(idDispositivo);
  return resp;
};

export const failuresEvidenceDevicePostServices = async (
  data: IAddressUsers,
): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const resp = await bd.registroDireccionUsuario(data);
  return resp;
};
