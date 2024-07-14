/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { performance } from 'perf_hooks';
import { IDetalleServicio, LoggerS3 } from '@chtalent/apis-common';
import axios, { AxiosRequestConfig, Method } from 'axios';
import qs from 'qs';
import { Illave } from './tipos';
import { SistemasEnum, EMensajesError } from '../enums/general.enum';
import { calcularTiempoEjecucion, formatearErrorApi } from '../helpers/ayudas';

export class AppGenerico {
  private readonly logger = LoggerS3.getInstance().getLogger();
  private token: string | null;
  private tokenExpira: Date;
  private credenciales: { usuario: string, password: string };
  private dnsApi: string;

  public constructor(params: { credenciales: { usuario: string, password: string }, dnsApi: string }) {
    this.tokenExpira = new Date();
    this.token = null;
    this.credenciales = params.credenciales;
    this.dnsApi = params.dnsApi;
  }

  public getToken = async (): Promise<{
    token: string | null,
    detalles: string, detalleServicio: IDetalleServicio
  }> => {
    const fechaActual = new Date();
    let detalles = '';
    let detServicio: IDetalleServicio = {
      servicio: 'AUTH',
      sistema: SistemasEnum[SistemasEnum.APIGEE],
      tiempo: 0,
    };
    if (!this.token || (this.tokenExpira < fechaActual)) {
      const {
        token: tokenAws, expiracion: expiracionAws,
        detalles: detallesAws, detalleServicio,
      } = await this.autenticar(detServicio);
      detServicio = detalleServicio;
      if (tokenAws) {
        fechaActual.setSeconds(expiracionAws);
        fechaActual.setMinutes(fechaActual.getMinutes() - 20);
        this.tokenExpira = fechaActual;
        this.token = tokenAws;
        detalles = detallesAws;
      }
    }
    return { token: this.token, detalles, detalleServicio: detServicio };
  };

  protected autenticar = async (detalleServicio: IDetalleServicio): Promise<{
    token: string | null, expiracion: number,
    detalles: string, detalleServicio: IDetalleServicio
  }> => {
    const logs: string[] = [];
    const data = qs.stringify({
      grant_type: 'client_credentials',
    });
    const config: AxiosRequestConfig = {
      auth: {
        username: this.credenciales.usuario,
        password: this.credenciales.password,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
      method: 'post',
      url: `${this.dnsApi}/oauth2/v1/token`,
    };
    const inicio = performance.now();
    let respuesta;
    logs.push(`\nPeticion =>\n${config.method}\n${config.url}\n${JSON.stringify(config.data)}`);
    try {
      detalleServicio.servicio = config.url || 'token';
      respuesta = await axios(config);
      detalleServicio.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
    } catch (error: any) {
      this.logger.info(`\nPeticion =>\n${config.method}\n${config.url}\n${config.data}\nRespuesta =>\n${JSON.stringify(respuesta?.data) || error.message}`);
      detalleServicio.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      this.logger.error(`Error al consultar Token: ${config.url}: respuesta: ${error?.response?.data
        ? JSON.stringify(error?.response?.data) : error?.message}`, detalleServicio);
      return {
        token: null,
        expiracion: 0,
        detalles: `No fue posible realizar la autenticación: ${error.code} -- ${error.message}`,
        detalleServicio,
      };
    }
    if (
      !respuesta.data.access_token
      || respuesta.data.access_token.trim() === ''
    ) {
      this.logger.error(
        `La respuesta de autenticación no contiene token: ${JSON.stringify(respuesta.data)}`,
      );
      return {
        token: null,
        expiracion: 0,
        detalles: `La respuesta de autenticación no contiene token: ${respuesta?.data}`,
        detalleServicio,
      };
    }
    const { data: datos } = respuesta;
    logs.push(`\nRespuesta =>  \n${JSON.stringify(respuesta.data)}`);
    this.logger.info(logs);
    return {
      token: datos.access_token,
      expiracion: Number(datos.expires_in),
      detalles: 'token exitoso',
      detalleServicio,
    };
  };

  public generarLLaves = async (url: string, limitString?: number, app?: string, verlog?: string): Promise<{
    llave: Illave | null,
    detalleServicio: IDetalleServicio[],
  }> => {
    const logs: string[] = [];
    const detalleServicioApi: IDetalleServicio = {
      servicio: 'API-SEGURIDAD',
      sistema: SistemasEnum[SistemasEnum.APIGEE],
      tiempo: 0,
    };
    const { token, detalleServicio: detalleServicioToken } = await this.getToken();
    if (!token) {
      this.logger.error(`Error: ${url}`, [detalleServicioToken, detalleServicioApi]);
      return { llave: null, detalleServicio: [detalleServicioToken, detalleServicioApi] };
    }
    const xAplication = app || 'dev2021#';
    const config: AxiosRequestConfig = {
      headers: {
        'x-application': xAplication,
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
      url: `${this.dnsApi}${url}`,
    };
    let respuesta;
    const inicio = performance.now();
    logs.push(`\nPeticion =>\n${config.method}\n${config.url}\n${JSON.stringify(config.data || {})}`);
    try {
      respuesta = await axios(config);
      detalleServicioApi.servicio = config.url || '';
      detalleServicioApi.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      this.logger.info(`${JSON.stringify({ method: config.method, data: config.data })},
       respuesta: ${respuesta?.status}`, [detalleServicioToken, detalleServicioApi]);
    } catch (error: any) {
      this.logger.info(`\nPeticion =>\n${config.method}\n${config.url}\n${config.data}\nRespuesta =>\n${JSON.stringify(respuesta?.data) || error.message}`);
      detalleServicioApi.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      this.logger.error(`${JSON.stringify({
        method: config.method,
        data: config.data,
      })}, respuesta: ${error?.response?.data
        ? JSON.stringify(error?.response?.data) : error?.message}`, [detalleServicioToken, detalleServicioApi]);
      return { llave: null, detalleServicio: [detalleServicioToken, detalleServicioApi] };
    }
    if (!respuesta.data) {
      return { llave: null, detalleServicio: [detalleServicioToken, detalleServicioApi] };
    }
    logs.push(`\nRespuesta =>  \n${limitString ? JSON.stringify(respuesta.data).substring(0, limitString) : JSON.stringify(respuesta.data)}`);
    if (verlog === 'si') this.logger.info(logs);
    return {
      llave: respuesta.data.resultado as Illave,
      detalleServicio: [detalleServicioToken, detalleServicioApi],
    };
  };

  public ejecutarPeticion = async <T>(parametros: {
    data?: any,
    dataNoCifrada?: any,
    guardarTransaccion?: boolean,
    recurso: string,
    verbo?: Method,
    sistema: string; // sistemasEnum
    header?: {
      'x-id-acceso'?: string,
      'x-idAcceso'?: string,
      'x-id-sistema'?: number
      'x-idTransaccion'?: number;
    } | any,
    detalleServicio?: IDetalleServicio[],
    limitString?: number,
    verlog?: string,
  }): Promise<{ estatus: number, resultado?: T, detalles: string }> => {
    const {
      data, recurso, verbo, header, sistema, limitString, verlog,
    } = parametros;
    const url = `${this.dnsApi}${recurso}`;
    const inicio = performance.now();
    const detalleEjecucion: IDetalleServicio = {
      servicio: url,
      sistema,
      tiempo: 0,
    };
    const { token, detalles, detalleServicio: detalleToken } = await this.getToken();
    const detalleServicio = parametros.detalleServicio || [detalleToken];
    if (!token) {
      return { estatus: 500, detalles };
    }
    const config: AxiosRequestConfig = {
      url,
      headers: {
        ...header,
        Authorization: `Bearer ${token}`,
      },
      method: verbo || 'post',
      data,
    };
    const logs: string[] = [];
    logs.push(`\nPeticion =>\n${config.method}\n${config.url}\n${limitString ? JSON.stringify(config.data).substring(0, limitString) : JSON.stringify(config.data)}`);
    let respuesta;
    try {
      console.log(config);
      respuesta = await axios(config);
      detalleEjecucion.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      this.logger.info(`${JSON.stringify({
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      })}, respuesta: ${JSON.stringify(respuesta?.status)}`, [...detalleServicio, detalleEjecucion]);
      if (respuesta?.status === 204) {
        return { estatus: 404, detalles: EMensajesError.NOT_FOUND };
      }
      console.log(respuesta.data);
      if (respuesta.data && respuesta.data.resultado) {
        logs.push(`\nRespuesta =>  \n${limitString ? JSON.stringify(respuesta.data).substring(0, limitString) : JSON.stringify(respuesta.data)}`);
        if (verlog === 'si') this.logger.info(logs);
        return { estatus: 200, resultado: respuesta.data.resultado as T, detalles: 'Consumo exitoso' };
      }
      return { estatus: respuesta?.status || 400, resultado: respuesta.data as T, detalles: '' };
    } catch (error: any) {
      console.log(error.response.data);
      this.logger.info(`\nPeticion =>\n${config.method}\n${config.url}\n${JSON.stringify(config.data)}\nRespuesta =>\n${JSON.stringify(respuesta?.data) || error.message}`);
      // try {
      //   const dataw = fs.readFileSync('./peticiones.txt', { encoding: 'utf-8' });
      //   const peticiones = dataw ? JSON.parse(dataw) : [];
      //   // console.log(peticiones);
      //   const update = peticiones.concat(...[{ request: config, response: error.response?.data }]);
      //   fs.writeFileSync('./peticiones.txt', JSON.stringify(update), { encoding: 'utf-8' });
      // } catch (error2) {
      //   console.log(error2);
      // }
      detalleEjecucion.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      const estatusCode = error?.response?.status || 0;
      const mensajeError = error?.response?.data?.detalles || error?.response?.data?.detalle;
      if ([400, 404, 204].includes(Number(estatusCode))) {
        this.logger.info(`
        Peticion no valida =>
        ${JSON.stringify({
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data,
        })}
        Estatus Code :${error?.response?.status}
        Respuesta: ${formatearErrorApi(mensajeError) || error.message}`,
        [...detalleServicio, detalleEjecucion]);
      } else {
        this.logger.error(`
        Error Interno del Servidor =>
        ${JSON.stringify({
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data,
        })}
        Estatus Code :${error?.response?.status}
        Respuesta: ${formatearErrorApi(mensajeError) || error.message}`,
        [...detalleServicio, detalleEjecucion]);
      }
      if (verlog === 'si') this.logger.info(logs);
      if (error?.response?.status === 204) {
        return { estatus: 404, detalles: EMensajesError.NOT_FOUND };
      }
      return { estatus: estatusCode || 500, detalles: formatearErrorApi(mensajeError) || error.message };
    }
  }

  public ejecutarPeticionV2 = async <T>(parametros: {
    data?: any,
    dataNoCifrada?: any,
    guardarTransaccion?: boolean,
    recurso: string,
    verbo?: Method,
    sistema: string;
    header?: {
      'x-id-acceso'?: string,
      'x-idAcceso'?: string,
      'x-id-sistema'?: number
      'x-idTransaccion'?: number;
    } | any,
    detalleServicio?: IDetalleServicio[],
    dnsApi?: string,
  }): Promise<{ estatus: number, resultado?: T, detalles: string }> => {
    const {
      data, recurso, verbo, header, sistema,
    } = parametros;
    const url = parametros.dnsApi ? `${parametros.dnsApi}${recurso}` : `${this.dnsApi}${recurso}`;
    const inicio = performance.now();
    const detalleEjecucion: IDetalleServicio = {
      servicio: url,
      sistema,
      tiempo: 0,
    };
    const { token, detalles, detalleServicio: detalleToken } = await this.getToken();
    const detalleServicio = parametros.detalleServicio || [detalleToken];
    if (!token) return { estatus: 500, detalles };
    if (header['x-id-token']) header['x-id-token'] = token;
    const config: AxiosRequestConfig = {
      url,
      headers: {
        ...header,
        Authorization: `Bearer ${token}`,
      },
      method: verbo || 'post',
      data,
    };
    /* try {
      const dataw = fs.readFileSync('./peticiones.txt', { encoding: 'utf-8' });
      const peticiones = dataw ? JSON.parse(dataw) : [];
      console.log(peticiones);
      const update = peticiones.concat(...[config]);
      fs.writeFileSync('./peticiones.txt', JSON.stringify(update), { encoding: 'utf-8' });
    } catch (error) {
      console.log(error);
    } */
    try {
      const respuesta = await axios(config);
      detalleEjecucion.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      // console.log(`url: ${config.url}\n
      // method: ${config.method}\n
      // headers: ${JSON.stringify(config.headers)}\n
      // data: ${JSON.stringify(config.data)}`);
      this.logger.info(
        `${JSON.stringify({
          url: config.url,
          method: config.method,
          headers: config.headers,
          data: config.data,
        })}
        codigo http: ${JSON.stringify(respuesta?.status)}
        Resultado: ${JSON.stringify(respuesta.data)}`,
        [...detalleServicio, detalleEjecucion],
      );

      if (respuesta.data && respuesta.data.resultado) {
        return { estatus: 200, resultado: respuesta.data.resultado as T, detalles: 'Consumo exitoso' };
      }
      return { estatus: respuesta?.status || 400, resultado: respuesta.data as T, detalles: '' };
    } catch (error: any) {
      // console.log(error.response?.data);
      detalleEjecucion.tiempo = calcularTiempoEjecucion({ inicio, final: performance.now() });
      const estatusCode = error?.response?.status || 0;
      const mensajeError = error?.response?.data?.detalles || error?.response?.data?.detalle;
      const mensaje = `${JSON.stringify({
        url: config.url,
        method: config.method,
        headers: config.headers,
        data: config.data,
      })}
      Estatus Code :${error?.response?.status}
      Respuesta: ${formatearErrorApi(mensajeError) || error.message}`;
      if ([400, 404, 401].includes(Number(estatusCode))) {
        this.logger.info(
          'Peticion no valida =>',
          mensaje,
          [...detalleServicio, detalleEjecucion],
        );
      } else {
        this.logger.error(
          'Error Interno del Servidor =>',
          mensaje,
          [...detalleServicio, detalleEjecucion],
        );
      }
      return { estatus: estatusCode || 500, detalles: formatearErrorApi(mensajeError) || error.message };
    }
  }
}
