import { MetodosBD } from '../../database/mysql/methods';
import { IRespuestaGenerica } from '../../models/general';
import { generateRandomString, generateToken } from '../../utils/auth';
import { getHashPassword, validaPassAlmacenada } from '../../utils/hashUtil';
const bd = MetodosBD.getInstance();
export const generaTokenServices = async (data: {
  username: string;
  password: string;
}): Promise<IRespuestaGenerica<{ token: string }>> => {
  const { username, password } = data;
  const {contrasena_login, nombre_usuario} = await bd.detalleLoginUsuario(username);
  const hash = await getHashPassword(password);
  const esValida = await validaPassAlmacenada(hash, contrasena_login);
  if (username === nombre_usuario && esValida) {
    const token = generateToken<{ usuario: string }>({ usuario: username });
    return {
      codigoHttp: 200,
      detalles: 'ok',
      resultado: { token },
    };
  }
  return {
    codigoHttp: 403,
    detalles: 'Invalid credentials',
  };
};

export const generaNombreUsuario = async (): Promise<string> => generateRandomString(15);
