import { ValidadorErroresParametros } from '@chtalent/apis-common';
import { AppRouter } from '../config/app-router';
import { userValidationPost } from './middleware/user.validator';
import { authenticateJWT } from './middleware/authMiddleware';
import { UsersController } from './controller/users.controller';

export class UsersRouter {
  private static instance: UsersRouter;

  static getInstance(): UsersRouter {
    if (!this.instance) {
      this.instance = new UsersRouter();
    }
    return this.instance;
  }

  inicializar = (): void => {
    const router = AppRouter.getInstance();
    const controlador = new UsersController();
    router.post(
      '/users',
      authenticateJWT,
      userValidationPost(),
      ValidadorErroresParametros.validar,
      controlador.userPost,
    );
  };
}
