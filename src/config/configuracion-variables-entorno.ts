import { LoggerS3 } from '@chtalent/apis-common';

export interface ICpiCredenciales {
  usuario: string;
  password: string;
}

export interface IAESKeysSecutity {
  aesKeyBase64: string;
  hmacKeyBase64: string;
}

export interface IParametrosBD {
  host: string;
  puerto: number;
  usuario: string;
  password: string;
  conexiones?: number;
  base?: string;
}

const logger = LoggerS3.getInstance().getLogger();
export class ConfiguracionVariables {
  private static instance: ConfiguracionVariables;
  static readonly APP_RUTA_BASE = process.env.APP_RUTA_BASE || '';
  static readonly APP_PUERTO = process.env.APP_PUERTO || '';
  static readonly BD_URL_DOCUMENT = process.env.BD_URL_DOCUMENT || '';

  static readonly URL_API_ON_DEV = process.env.URL_API_ON_DEV || '';
  static readonly URL_API_ON_QA = process.env.URL_API_ON_QA || '';
  static readonly URL_API_AWS = process.env.URL_API_AWS || '';

  static readonly ID_TELEGRAM_NOTIFICACIONES = process.env.ID_TELEGRAM_NOTIFICACIONES || '';

  static readonly AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || '';
  static readonly AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '';

  static readonly JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

  static getInstance(): ConfiguracionVariables {
    if (!this.instance) {
      this.instance = new ConfiguracionVariables();
    }
    return this.instance;
  }

  inicializar = (): void => {
    let hayError = false;
    if (ConfiguracionVariables.APP_RUTA_BASE === '') {
      logger.error('Falta variable APP_RUTA_BASE');
      hayError = true;
    }
    if (ConfiguracionVariables.APP_PUERTO === '') {
      logger.error('Falta variable APP_PUERTO');
      hayError = true;
    }
    if (ConfiguracionVariables.AWS_ACCESS_KEY_ID === '') {
      logger.error('Falta variable AWS_ACCESS_KEY_ID');
      hayError = true;
    }
    if (ConfiguracionVariables.AWS_SECRET_ACCESS_KEY === '') {
      logger.error('Falta variable AWS_SECRET_ACCESS_KEY');
      hayError = true;
    }
    if (ConfiguracionVariables.JWT_SECRET_KEY === '') {
      logger.error('Falta variable JWT_SECRET_KEY');
      hayError = true;
    }
    if (hayError) {
      throw new Error('Faltan variables de entorno');
    }
  };

  private static validarCredencialesJSON = (data: string, nombreVariable: string): ICpiCredenciales => {
    if (!data || data.trim() === '') {
      throw new Error(`Falta variable ${nombreVariable}`);
    }
    let credenciales: ICpiCredenciales;
    try {
      credenciales = JSON.parse(data);
    } catch (error) {
      throw new Error(`La variable ${nombreVariable} debe ser un JSON`);
    }
    if (!credenciales.usuario || typeof credenciales.usuario !== 'string' || credenciales.usuario.trim() === '') {
      throw new Error(`${nombreVariable} debe tener un campo usuario, debe ser cadena y no debe estar vacía`);
    }
    if (!credenciales.password || typeof credenciales.password !== 'string' || credenciales.password.trim() === '') {
      throw new Error(`${nombreVariable} debe tener un campo password, debe ser cadena y no debe estar vacía`);
    }
    return credenciales;
  };

  private static validarParametrosBD = (data: string, nombreVariable: string): IParametrosBD => {
    if (!data || data.trim() === '') {
      throw new Error(`Falta variable ${nombreVariable}`);
    }
    let params: IParametrosBD;
    try {
      params = JSON.parse(data);
    } catch (error) {
      throw new Error(`La variable ${nombreVariable} debe ser un JSON`);
    }
    if (!params.host || typeof params.host !== 'string' || params.host.trim() === '') {
      throw new Error(`La variable ${nombreVariable} debe tener un campo host y debe ser una cadena`);
    }
    if (!params.puerto || !Number.isInteger(params.puerto)) {
      throw new Error(`La variable ${nombreVariable} debe tener un campo puerto y debe ser un número entero`);
    }
    if (!params.usuario || typeof params.usuario !== 'string' || params.usuario.trim() === '') {
      throw new Error(`La variable ${nombreVariable} debe tener un campo usuario y debe ser una cadena`);
    }
    if (!params.password || typeof params.password !== 'string' || params.password.trim() === '') {
      throw new Error(`La variable ${nombreVariable} debe tener un campo password y debe ser una cadena`);
    }
    if (params.conexiones && !Number.isInteger(params.conexiones)) {
      throw new Error(`El campo conexiones de la variable ${nombreVariable} debe ser un número entero`);
    }
    if (params.base && (typeof params.password !== 'string' || params.password.trim() === '')) {
      throw new Error(`El campo base de la variable ${nombreVariable} debe ser una cadena`);
    }

    return params;
  };

  private static validarCredenciales(): { id: number; usuario: string; password: string }[] {
    if (!process.env.CREDENCIALES || process.env.CREDENCIALES.trim() === '') {
      return [];
    }
    let credenciales: { id: number; usuario: string; password: string }[];
    try {
      credenciales = JSON.parse(process.env.CREDENCIALES);
      logger.debug(credenciales);
    } catch (error) {
      // throw new Error('La variable SSFF_CPI_CREDEcredenciales debe ser un JSON');
    }
    return [];
  }

  static readonly PARAMS_DB_AURORA = ConfiguracionVariables.validarParametrosBD(
    process.env.PARAMS_DB_AURORA || '',
    'PARAMS_DB_AURORA',
  );
  static readonly PARAMS_DB_AURORA_RO = ConfiguracionVariables.validarParametrosBD(
    process.env.PARAMS_DB_AURORA_RO || '',
    'PARAMS_DB_AURORA_RO',
  );

  /* static readonly GS_BCH_CYOI_BE_DEV: ICpiCredenciales = ConfiguracionVariables.validarCredencialesJSON(
    process.env.GS_BCH_CYOI_BE_DEV || '',
    'GS_BCH_CYOI_BE_DEV',
  );
  static readonly GS_BCH_CYOI_BE: ICpiCredenciales = ConfiguracionVariables.validarCredencialesJSON(
    process.env.GS_BCH_CYOI_BE || '',
    'GS_BCH_CYOI_BE',
  ); */
  /* static readonly BCH_CYPX_BE_AWS: ICpiCredenciales = ConfiguracionVariables.validarCredencialesJSON(
    process.env.BCH_CYPX_BE_AWS || '',
    'BCH_CYPX_BE_AWS',
  ); */
  /* static readonly GS_BCH_CYOI_BE_DEV_CP: ICpiCredenciales = ConfiguracionVariables.validarCredencialesJSON(
    process.env.GS_BCH_CYOI_BE_DEV_CP || '',
    'GS_BCH_CYOI_BE_DEV_CP',
  ); */
  static readonly CREDENCIALES: { id: number; usuario: string; password: string }[] =
    ConfiguracionVariables.validarCredenciales();
}
