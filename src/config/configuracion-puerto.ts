import * as http from 'http';
import { LoggerS3 } from '@chtalent/apis-common';
import { ConfiguracionVariables } from './configuracion-variables-entorno';
import { AppRouter } from './app-router';
import { App } from './app';

export class ConfiguracionPuerto {
  private static instance: ConfiguracionPuerto;
  private logger = LoggerS3.getInstance().getLogger();
  private constructor() {
  }

  static getInstance(): ConfiguracionPuerto {
    if (!this.instance) {
      this.instance = new ConfiguracionPuerto();
    }
    return this.instance;
  }

  inicializar = async (): Promise<http.Server> => {
    const app = App.getInstance();
    const appPuertoConfig = (): Promise<http.Server> => new Promise((resolve) => {
      const serv = app.listen(ConfiguracionVariables.APP_PUERTO, () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        AppRouter.getInstance().stack.forEach((ruta: any) => {
          if (ruta && ruta.route && ruta.route.path) {
            const verbo = Object.keys(ruta.route.methods)[0].toUpperCase();
            this.logger.info(
              `${ConfiguracionVariables.APP_RUTA_BASE}${ruta.route.path} -->> ${verbo}`,
            );
          }
        });
        resolve(serv);
      });
    });
    try {
      const server = await appPuertoConfig();
      return server;
    } catch (error: any) {
      this.logger.error(`'Error al configurar el puerto de la aplicación ${error.message}`);
      throw new Error('Error al configurar el puerto de la aplicación');
    }
  }
}
