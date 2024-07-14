import * as http from 'http';
import { LoggerS3 } from '@chtalent/apis-common';
import { ConfiguracionBaseDeDatos } from './configuracion-base-datos';

export class ConfiguracionApagado {
  private logger = LoggerS3.getInstance().getLogger();
  private static instance: ConfiguracionApagado;


  static getInstance(): ConfiguracionApagado {
    if (!this.instance) {
      this.instance = new ConfiguracionApagado();
    }
    return this.instance;
  }

  inicializar = (server: http.Server): void => {
    process.on('uncaughtExceptionMonitor', (err: any, origin: any) => {
      this.logger.error(`Codigo recibido: uncaughtExceptionMonitor, error: ${err}, origen: ${origin}, Apagando servidor`);
      this.apagarServicio('uncaughtExceptionMonitor', server);
    });
    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(`Codigo recibido: unhandledRejection, error: ${reason}, promise: ${JSON.stringify(promise)}, Apagando servidor`);
      this.apagarServicio('unhandledRejection', server);
    });
    process.on('SIGTERM', () => {
      this.logger.error(`Codigo recibido: SIGTERM, Apagando servidor`);
      this.apagarServicio('SIGTERM', server);
    });

    process.on('SIGINT', () => {
      this.logger.error(`Codigo recibido: SIGINT, Apagando servidor`);
      this.apagarServicio('SIGINT', server);
    });
  }

  apagarServicio = async (code: string, server: http.Server): Promise<void> => {
    server.close(async (error?: Error | undefined) => {
      if (error) {
        //this.logger.error('Ocurrió un error al cerrar el servidor', error);
      }
      process.exit();
    });
  };
}
