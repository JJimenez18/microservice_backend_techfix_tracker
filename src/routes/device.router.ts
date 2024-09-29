import { ValidadorErroresParametros } from '@chtalent/apis-common';
import { AppRouter } from '../config/app-router';
import {
  addressValidationPOST,
} from './middleware/user.validator';
import { authenticateJWT } from './middleware/authMiddleware';
import { DeviceController } from './controller/device.controller';
import { nombreUsuarioValidation } from './middleware/general.validator';
import { deviceValidationPost } from './middleware/device.validator';

export class DeviceRouter {
  private static instance: DeviceRouter;

  static getInstance(): DeviceRouter {
    if (!this.instance) {
      this.instance = new DeviceRouter();
    }
    return this.instance;
  }

  inicializar = (): void => {
    const router = AppRouter.getInstance();
    const controlador = new DeviceController();
    router.get(
      '/devices',
      authenticateJWT,
      nombreUsuarioValidation(),
      ValidadorErroresParametros.validar,
      controlador.devicesGet,
    );

    router.get(
      '/device/:idDevice',
      authenticateJWT,
      nombreUsuarioValidation(),
      ValidadorErroresParametros.validar,
      controlador.devicesGet,
    );

    router.post(
      '/devices',
      authenticateJWT,
      deviceValidationPost(),
      ValidadorErroresParametros.validar,
      controlador.devicesPost,
    );

    router.put(
      '/device',
      authenticateJWT,
      addressValidationPOST(),
      ValidadorErroresParametros.validar,
      controlador.devicesPut,
    );

    router.get(
      '/devices/types',
      authenticateJWT,
      controlador.devicesTiposGet,
    );

    router.get(
      '/device/status',
      authenticateJWT,
      controlador.devicesPut,
    );

    router.put(
      '/device/status',
      authenticateJWT,
      controlador.devicesPut,
    );

    router.post(
      '/device/failures',
      authenticateJWT,
      addressValidationPOST(),
      ValidadorErroresParametros.validar,
      controlador.failuresDevicePost,
    );

    router.post(
      '/device/failures/evidence',
      authenticateJWT,
      addressValidationPOST(),
      ValidadorErroresParametros.validar,
      controlador.failuresEvidenceDevicePost,
    );
  };
}
