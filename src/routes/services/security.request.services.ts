import { MetodosBD } from '../../database/mysql/methods';
import { IRespGen } from '../../models/general';
import { generateToken } from '../../utils/auth';
import { validaPassAlmacenada } from '../../utils/hashUtil';

const bd = MetodosBD.getInstance();

export const generaTokenServices = async (data: {
  username: string;
  password: string;
}): Promise<IRespGen<{ token: string }>> => {
  const { username, password } = data;
  const { data: detUser, details, statusCode } = await bd.detalleLoginUsuario(username);
  if (statusCode !== 200) {
    return {
      statusCode,
      details,
      data: { token: '' },
    };
  }
  const { contrasenaLogin, nombreUsuario } = detUser;
  const esValida = await validaPassAlmacenada(password, contrasenaLogin);
  if (username === nombreUsuario && esValida) {
    const token = generateToken<{ usuario: string }>({ usuario: username });
    return {
      statusCode: 200,
      details: 'ok',
      data: { token },
    };
  }
  return {
    statusCode: 403,
    details: 'Invalid credentials',
    data: { token: '' },
  };
};
