import { IRespuestaGenerica } from '../../models/general';
import { generateRandomString } from '../../utils/auth';
import { IDetalleUsuario } from '../models/users.models';

export const usersPostServices = async (data: IDetalleUsuario): Promise<IRespuestaGenerica<IDetalleUsuario>> => {
  const {
    contrasenia, email, nombre, telefono,
  } = data;

  const usuario = {
    userName: generateRandomString(15),
    contrasenia,
    nombre,
    telefono,
    email,
  };

  return {
    codigoHttp: 201,
    detalles: 'ok',
    resultado: usuario,
  };
};
