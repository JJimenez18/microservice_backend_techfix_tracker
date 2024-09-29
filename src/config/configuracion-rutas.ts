import 'express-async-errors';
import { RutaPorDefecto, RutaError, RutasMonitoreo } from '@chtalent/apis-common';
import { AppRouter } from './app-router';
import { ConfiguracionVariables } from './configuracion-variables-entorno';
import { App } from './app';
import { ConfiguracionBaseDeDatos } from './configuracion-base-datos';
import { SecurityRouter } from '../routes/security.request.router';
import { UsersRouter } from '../routes/users.router';
import { ClientsRouter } from '../routes/clients.router';
import { DeviceRouter } from '../routes/device.router';

export class ConfiguracionRutas {
  private static instance: ConfiguracionRutas;

  static getInstance(): ConfiguracionRutas {
    if (!this.instance) {
      this.instance = new ConfiguracionRutas();
    }
    return this.instance;
  }

  inicializar = (): void => {
    const monitoreo = RutasMonitoreo.getInstance();
    monitoreo.inicializar(AppRouter.getInstance());
    monitoreo.monitoreoDisponible(ConfiguracionBaseDeDatos.getInstance().monitoreo);
    monitoreo.monitoreoDesconectar(ConfiguracionBaseDeDatos.getInstance().desconectarReq);

    SecurityRouter.getInstance().inicializar();
    UsersRouter.getInstance().inicializar();
    ClientsRouter.getInstance().inicializar();
    DeviceRouter.getInstance().inicializar();

    RutaPorDefecto.getInstance().inicializar(AppRouter.getInstance());
    RutaError.getInstance().inicializar(AppRouter.getInstance());
    App.getInstance().use(ConfiguracionVariables.APP_RUTA_BASE, AppRouter.getInstance());
  }
}
