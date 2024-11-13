/* eslint-disable prefer-destructuring */
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/auth';
import { EMensajesError } from '../../enums/general.enum';
import { validaErrores } from '../../helpers/ayudas';

const decodeBase64 = (encodedValue: string): string => {
  const decodedBytes = Buffer.from(encodedValue, 'base64');
  return decodedBytes.toString('utf-8');
};

export const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  let credentidal = req.headers.authorization;
  if (!credentidal) {
    return validaErrores({ codigoHttp: 400 });
  }
  credentidal = credentidal.replace('Basic ', '');
  const valorDecodificado = decodeBase64(credentidal).split(':');
  req.body.username = valorDecodificado[0];
  req.body.password = valorDecodificado[1];
  next();
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      // console.log(decoded);
      req.body.nombreUsuario = decoded.usuario;
      // console.log('authenticateJWT', req.body);
      next();
    } catch (err) {
      return validaErrores({ codigoHttp: 403 });
    }
  } else {
    return validaErrores({ codigoHttp: 401, mensaje: EMensajesError.TOKEN });
  }
};
