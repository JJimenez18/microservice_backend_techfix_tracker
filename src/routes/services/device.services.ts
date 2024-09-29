/* eslint-disable no-param-reassign */
import { MetodosBD } from '../../database/mysql/methods';
import { IAltaDispositivo, IConsultaDispositivos, IConsultaTiposDispositivos } from '../../database/mysql/models/input';
import { IConsultaDispositivosO, IRespDBGenericaO } from '../../database/mysql/models/output';
import { IRespGen } from '../../models/general';
import { IAddressUsers } from '../models/users.models';

const bd = MetodosBD.getInstance();

export const devicesPostServices = async (data: IAltaDispositivo): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const usuario = await bd.registroDispositivos(data);
  return usuario;
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

export const failuresDevicePostServices = async (data: IAddressUsers): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const resp = await bd.registroDireccionUsuario(data);
  return resp;
};

export const failuresEvidenceDevicePostServices = async (
  data: IAddressUsers,
): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const resp = await bd.registroDireccionUsuario(data);
  return resp;
};
