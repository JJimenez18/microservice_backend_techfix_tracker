import jwt from 'jsonwebtoken';
import { ConfiguracionVariables } from '../config/configuracion-variables-entorno';

const secretKey = ConfiguracionVariables.JWT_SECRET_KEY;

// eslint-disable-next-line max-len
export const generateToken = <T> (payload: T): string => jwt.sign(payload as any, secretKey, { expiresIn: '1h' });

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

export const generateRandomString = (length: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
