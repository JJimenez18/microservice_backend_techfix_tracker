import { LoggerS3 } from '@chtalent/apis-common';
import https from 'https';
import axios from 'axios';
import { ConfiguracionVariables } from './configuracion-variables-entorno';
import { ConfiguracionRutas } from './configuracion-rutas';
import { ConfiguracionExpress } from './configuracion-express';
import { ConfiguracionApagado } from './configuracion-apagado';
import { ConfiguracionPuerto } from './configuracion-puerto';
import { AppRouter } from './app-router';
import { ConfiguracionBaseDeDatosDocument } from './configuracion-base-datos-document';
import { ConfiguracionBaseDeDatos } from './configuracion-base-datos';

export class ConfiguracionGeneral {
  private readonly logger = LoggerS3.getInstance().getLogger();

  inicializar = async (): Promise<void> => {
    try {
      // Configurar variables entorno
      // this.logger.info('Iniciando configuración de variables..20211104...');
      ConfiguracionVariables.getInstance().inicializar();

      // this.logger.info('Iniciando configuración express...');
      const app = ConfiguracionExpress.getInstance().inicializar();

      // Configurar base de datos
      // this.logger.info('Iniciando conexión a base de datos...');
      // await ConfiguracionBaseDeDatos.getInstance().pruebaConexion();
      // await ConfiguracionBaseDeDatos.getInstance().pruebaConexionRo();
      // await ConfiguracionBaseDeDatosDocument.getInstance().inicializar();

      // Configurar rutas
      // this.logger.info('Iniciando configuración de rutas...');
      ConfiguracionRutas.getInstance().inicializar();
      app.use(AppRouter.getInstance());

      // Configuración de puerto
      // this.logger.info('Iniciando configuración de puerto de aplicación...');
      const server = await ConfiguracionPuerto.getInstance().inicializar();
      axios.defaults.httpsAgent = new https.Agent({
        rejectUnauthorized: false,
      });
      // Configurar apagado suave
      ConfiguracionApagado.getInstance().inicializar(server);

      this.logger.info('---Proyecto iniciado exitosamente---');
    } catch (error: any) {
      this.logger.error(`Ocurrió un error al inicializar la aplicación: ${JSON.stringify(error.message)}`);
    }
  }
}
