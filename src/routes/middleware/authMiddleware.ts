import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/auth';
import { validaErrores } from '../../helpers/ayudas';
import { EMensajesError } from '../../enums/general.enum';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      // console.log(decoded);
      req.body.username = decoded.usuario;
      // console.log(req.body);
      next();
    } catch (err) {
      return validaErrores({ codigoHttp: 403 });
    }
  } else {
    return validaErrores({ codigoHttp: 401, mensaje: EMensajesError.TOKEN });
  }
};
