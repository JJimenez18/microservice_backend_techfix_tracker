import { ValidadorErroresParametros } from '@chtalent/apis-common';
import { AppRouter } from '../config/app-router';
import { SecurityController } from './controller/security.request.controller';
import { authenticateJWT } from './middleware/authMiddleware';
import { generaTokenValidation } from './middleware/security.request.validator';

export class SecurityRouter {
  private static instance: SecurityRouter;

  static getInstance(): SecurityRouter {
    if (!this.instance) {
      this.instance = new SecurityRouter();
    }
    return this.instance;
  }

  inicializar = (): void => {
    const router = AppRouter.getInstance();
    const controlador = new SecurityController();
    router.post(
      '/oauth2/v1/token',
      generaTokenValidation(),
      ValidadorErroresParametros.validar,
      controlador.tokenGenerate,
    );

    router.post('/oauth2/verifica/token', authenticateJWT, controlador.verificaTtokenGenerate);
  };
}
