import { IRespuestaGenerica } from '../../models/general';
import { generateRandomString, generateToken } from '../../utils/auth';

export const generaTokenServices = async (data: {
  username: string;
  password: string;
}): Promise<IRespuestaGenerica<{ token: string }>> => {
  const { username, password } = data;
  if (username === 'user' && password === 'password') {
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
