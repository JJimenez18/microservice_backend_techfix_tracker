/* eslint-disable no-param-reassign */
import { MetodosBD } from '../../database/mysql/methods';
import { IRespDBGenericaO, IDireccionesUsuariosO } from '../../database/mysql/models/output';
import { IRespGen } from '../../models/general';
import { getHashPassword } from '../../utils/hashUtil';
import { IAddressUsers, IDetalleUsuario } from '../models/users.models';

const bd = MetodosBD.getInstance();

export const usersPostServices = async (data: IDetalleUsuario): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const {
    correoElectronico, nombre, telefono, nombreUsuario,
  } = data;
  const passwordHash = await getHashPassword(data.contrasenia);
  const usuario = await bd.registroUsuario({
    nombreUsuario,
    contrasenia: passwordHash,
    nombre,
    telefono,
    correoElectronico,
  });
  return usuario;
};

export const userNamePostServices = async (userName: string): Promise<IRespGen<number>> => {
  const resp = await bd.nombreUsuarioDisponible(userName);
  return resp;
};

export const techniciansGetServices = async (userName: string): Promise<IRespGen<number>> => {
  const resp = await bd.nombreUsuarioDisponible(userName);
  return resp;
};

export const usernameAddressGetServices = async (userName: string): Promise<IRespGen<IDireccionesUsuariosO[]>> => {
  // const { data } = await userNamePostServices(userName);
  // if ([0].includes(data)) {
  //   return {
  //     data: [],
  //     details: EMensajesError.FORBIDDEN,
  //     statusCode: 204,
  //   };
  // }
  const resp = await bd.direcciones(userName);
  return resp;
};

export const usernameAddressIDGetServices = async (
  userName: string,
  id: number,
): Promise<IRespGen<IDireccionesUsuariosO>> => {
  const resp = await bd.direccionesPorID(userName, id);
  return resp;
};

export const addressUsersPostServices = async (data: IAddressUsers): Promise<IRespGen<IRespDBGenericaO[]>> => {
  const resp = await bd.registroDireccionUsuario(data);
  return resp;
};

export const usernameAddressIDDeleteServices = async (
  userName: string,
  id: number,
): Promise<IRespGen<string>> => {
  const resp = await bd.direccionesPorIDDelete(userName, id);
  return resp;
};
