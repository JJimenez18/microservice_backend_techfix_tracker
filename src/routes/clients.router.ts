import { ValidadorErroresParametros } from '@chtalent/apis-common';
import { AppRouter } from '../config/app-router';
import { authenticateJWT } from './middleware/authMiddleware';
import { ClientsController } from './controller/clients.controller';
import { addressClientValidationPOST, clientsValidationPost } from './middleware/clients.validator';

export class ClientsRouter {
  private static instance: ClientsRouter;

  static getInstance(): ClientsRouter {
    if (!this.instance) {
      this.instance = new ClientsRouter();
    }
    return this.instance;
  }

  inicializar = (): void => {
    const router = AppRouter.getInstance();
    const controlador = new ClientsController();
    router.get(
      '/clients',
      authenticateJWT,
      controlador.clientsGET,
    );

    router.post(
      '/clients',
      authenticateJWT,
      clientsValidationPost(),
      ValidadorErroresParametros.validar,
      controlador.clientsPost,
    );

    router.get(
      '/clients/address/:idUsuario',
      authenticateJWT,
      controlador.addressClientsGet,
    );

    router.get(
      '/clients/address/:idUsuario/:idDireccion',
      authenticateJWT,
      controlador.addressIDClientsGet,
    );

    router.post(
      '/clients/address',
      authenticateJWT,
      addressClientValidationPOST(),
      ValidadorErroresParametros.validar,
      controlador.addressClientsPOST,
    );

    router.delete(
      '/clients/address/:idDireccion',
      authenticateJWT,
      controlador.addressIDUsersDelete,
    );
  };
}
