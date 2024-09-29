/* eslint-disable no-param-reassign */
import { MetodosBD } from '../../database/mysql/methods';
import { IRespDBGenericaO, IDireccionesUsuariosO } from '../../database/mysql/models/output';
import { IRespGen } from '../../models/general';
import { getHashPassword } from '../../utils/hashUtil';
import { clientsGET, clientsPOST } from '../models/clients.models';
import { IAddressUsers, IDetalleUsuario } from '../models/users.models';

const bd = MetodosBD.getInstance();

export const clientsGetServices = async (): Promise<IRespGen<clientsGET[]>> => {
  const usuario = await bd.consultaClientes();
  return usuario;
};

export const clientsPostServices = async (data: clientsPOST): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const usuario = await bd.registroClientes(data);
  return usuario;
};

export const userNamePostServices = async (userName: string): Promise<IRespGen<number>> => {
  const resp = await bd.nombreUsuarioDisponible(userName);
  return resp;
};

export const clientsAddressGetServices = async (idUsuario: string): Promise<IRespGen<IDireccionesUsuariosO[]>> => {
  const resp = await bd.direccionesClientes(idUsuario);
  return resp;
};

export const clientsAddressIDGetServices = async (
  userName: string,
  id: number,
): Promise<IRespGen<IDireccionesUsuariosO>> => {
  const resp = await bd.direccionesClientesPorID(userName, id);
  return resp;
};

export const addressClientsPostServices = async (data: IAddressUsers): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const resp = await bd.registroDireccionCliente(data);
  return resp;
};

export const clientsAddressIDDeleteServices = async (
  id: number,
): Promise<IRespGen<string>> => {
  const resp = await bd.direccionesClientesPorIDDelete(id);
  return resp;
};
