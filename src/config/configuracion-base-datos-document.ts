/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import { Request, Response } from 'express';
import { crearLogger, errorApi, exitoApi } from '@chtalent/apis-common';
import fs from 'fs';
import mongoose, {
  Mongoose,
} from 'mongoose';
import { ConfiguracionVariables } from './configuracion-variables-entorno';

export class ConfiguracionBaseDeDatosDocument {
  private readonly logger = crearLogger(module);
  private static instance: ConfiguracionBaseDeDatosDocument;

  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(): ConfiguracionBaseDeDatosDocument {
    if (!this.instance) {
      this.instance = new ConfiguracionBaseDeDatosDocument();
    }
    return this.instance;
  }

  inicializar = async (): Promise<Mongoose> => {
    try {
      const conexionBD = mongoose.connect(ConfiguracionVariables.BD_URL_DOCUMENT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        ssl: true,
        sslValidate: false,
        sslCA: [fs.readFileSync('./rds-combined-ca-bundle-2.pem')],
      });
      this.logger.info('<<<< Conexión exitosa a la base de datos >>>>');
      return conexionBD;
    } catch (error) {
      this.logger.error(`Error de conexión a la BD: ${error}`);
      throw new Error('Error de conexión a la base de datos');
    }
  };

  desconectar = async (solicitud: Request, respuesta: Response): Promise<Response> => {
    try {
      await mongoose.disconnect();
      return exitoApi.exito(respuesta, {
        mensaje: 'Base de datos desconectada exitosamente',
      });
    } catch (error) {
      this.logger.error('Error al cerrar conexiones de BD: ', error);
      throw errorApi.errorInternoServidor.bd(
        'Ocurrió un error al cerrar las conexiones de BD',
      );
    }
  };

  desconectarLocal = async (): Promise<void> => {
    try {
      await mongoose.disconnect();
      this.logger.info('Base de datos desconectada exitosamente');
    } catch (error) {
      this.logger.error('Error al cerrar conexiones de BD: ', error);
    }
  };
}
