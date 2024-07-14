/* eslint-disable no-param-reassign */
import { LoggerS3 } from '@chtalent/apis-common';
import { IRespuestaGenerica } from '../../../models/general';
import { BitacoraLogsAppModel } from '../schemas/demo';

export class BitacoraLogsApp {
    private static instance: BitacoraLogsApp
    private readonly logger = LoggerS3.getInstance().getLogger()
    static getInstance(): BitacoraLogsApp {
      if (!this.instance) {
        this.instance = new BitacoraLogsApp();
      }
      return this.instance;
    }

    public saveLogs = async (
      logs: any,
    ): Promise<IRespuestaGenerica<any[]>> => {
      try {
        await BitacoraLogsAppModel.insertMany(logs);
        return { codigoHttp: 200, detalles: 'Datos insertados exitosamente' };
      } catch (error: any) {
        this.logger.error(error.message);
        return { codigoHttp: 500, detalles: error.message };
      }
    }
}
