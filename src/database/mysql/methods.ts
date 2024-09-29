/* eslint-disable max-len */
import { errorApi } from '@chtalent/apis-common';
import { ConfiguracionBaseDeDatos, ISPParams } from '../../config/configuracion-base-datos';
import { SpListas } from './store.procedure';
import {
  IRespDBGenericaO, ICredencialesLoginO, IDireccionesUsuariosO, IConsultaDispositivosO,
} from './models/output';
import { EMensajesError } from '../../enums/general.enum';
import { IRespGen } from '../../models/general';
import { IAddressUsers, IDetalleUsuario } from '../../routes/models/users.models';
import { clientsGET, clientsPOST } from '../../routes/models/clients.models';
import { IAltaDispositivo, IConsultaDispositivos, IConsultaTiposDispositivos } from './models/input';

export class MetodosBD {
  private static instance: MetodosBD;
  private readonly db = ConfiguracionBaseDeDatos.getInstance();
  private readonly spListas: SpListas = SpListas.getInstance();

  static getInstance(): MetodosBD {
    if (!MetodosBD.instance) {
      this.instance = new MetodosBD();
    }
    return this.instance;
  }

  public detalleLoginUsuario = async (nombreUsuario: string): Promise<IRespGen<ICredencialesLoginO>> => {
    let resultado: ICredencialesLoginO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.CREDENCIALES_USUARIO_LOGIN.llamarSP(),
      parametros: [nombreUsuario],
    };
    try {
      resultado = await this.db.ejecutarSP<ICredencialesLoginO>(params);
      // resultado = [
      //   {
      //     idoLgin: '1',
      //     nombreUsuario: 'jjimenez18',
      //     contrasenaLogin:
      //       'baf7a24264277ee6b471c1f20e3dbde0:fe8c7b2497ef4332b114fd2ca928d701d760f23c0f95780d92c6ec163c5d0179da96e4bba61a410817d8fa51890eeb66cde6e543f989656b2246f450149c4258',
      //   },
      // ];
      if (resultado.length === 0) {
        return {
          data: {} as ICredencialesLoginO,
          details: EMensajesError.NOT_AUTH_REQUEST,
          statusCode: 401,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5001);
    }
    return {
      data: resultado[0],
      details: 'ok',
      statusCode: 200,
    };
  };

  public nombreUsuarioDisponible = async (nombreUsuario: string): Promise<IRespGen<number>> => {
    let resultado: { seEncontro: string }[] = [];
    const params: ISPParams = {
      nombre: this.spListas.VALIDA_NOMBRE_USUARIO_DISPONIBLE.llamarSP(),
      parametros: [nombreUsuario],
    };
    try {
      resultado = await this.db.ejecutarSP<{ seEncontro: string }>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5002);
    }
    return {
      data: Number(resultado[0].seEncontro),
      details: 'ok',
      statusCode: [0].includes(Number(resultado[0].seEncontro)) ? 204 : 400,
    };
  };

  public direccionesClientes = async (nombreUsuario: string): Promise<IRespGen<IDireccionesUsuariosO[]>> => {
    let resultado: IDireccionesUsuariosO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DIRECCIONES_CLIENTES.llamarSP(),
      parametros: [nombreUsuario],
    };
    try {
      resultado = await this.db.ejecutarSP<IDireccionesUsuariosO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: [],
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado,
      details: 'ok',
      statusCode: 200,
    };
  };

  public direccionesClientesPorID = async (nombreUsuario: string, id: number): Promise<IRespGen<IDireccionesUsuariosO>> => {
    let resultado: IDireccionesUsuariosO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DIRECCIONES_CLIENTES_ID.llamarSP(),
      parametros: [nombreUsuario, id],
    };
    try {
      resultado = await this.db.ejecutarSP<IDireccionesUsuariosO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: {} as IDireccionesUsuariosO,
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado[0],
      details: 'ok',
      statusCode: 200,
    };
  };

  public direcciones = async (nombreUsuario: string): Promise<IRespGen<IDireccionesUsuariosO[]>> => {
    let resultado: IDireccionesUsuariosO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DIRECCIONES_USUARIO.llamarSP(),
      parametros: [nombreUsuario],
    };
    try {
      resultado = await this.db.ejecutarSP<IDireccionesUsuariosO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: [],
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado,
      details: 'ok',
      statusCode: 200,
    };
  };

  public direccionesPorID = async (nombreUsuario: string, id: number): Promise<IRespGen<IDireccionesUsuariosO>> => {
    let resultado: IDireccionesUsuariosO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DIRECCIONES_ID.llamarSP(),
      parametros: [nombreUsuario, id],
    };
    try {
      resultado = await this.db.ejecutarSP<IDireccionesUsuariosO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: {} as IDireccionesUsuariosO,
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado[0],
      details: 'ok',
      statusCode: 200,
    };
  };

  public direccionesPorIDDelete = async (nombreUsuario: string, id: number): Promise<IRespGen<string>> => {
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DELETE_DIRECCIONES_ID.llamarSP(),
      parametros: [nombreUsuario, id],
    };
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado[0].mensaje,
      details: 'ok',
      statusCode: Number(resultado[0].estatus) === 0 ? 204 : 200,
    };
  };

  public direccionesClientesPorIDDelete = async (id: number): Promise<IRespGen<string>> => {
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.DELETE_DIRECCIONES_ID.llamarSP(),
      parametros: [id],
    };
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5003);
    }
    return {
      data: resultado[0].mensaje,
      details: 'ok',
      statusCode: Number(resultado[0].estatus) === 0 ? 204 : 200,
    };
  };

  public consultaClientes = async (): Promise<IRespGen<clientsGET[]>> => {
    let resultado: clientsGET[] = [];
    const params: ISPParams = {
      nombre: this.spListas.CONSULTA_CLIENTES.llamarSP(),
      parametros: [],
    };
    try {
      resultado = await this.db.ejecutarSP<clientsGET>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: [],
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5005);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 200,
    };
  };

  public registroUsuario = async (alta: IDetalleUsuario): Promise<IRespGen<IRespDBGenericaO[]>> => {
    const {
      contrasenia, nombre, nombreUsuario, telefono, correoElectronico,
    } = alta;
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.REGISTRA_USUARIO.llamarSP(),
      parametros: [nombreUsuario, contrasenia, nombre, telefono, correoElectronico],
    };
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 1 && [0].includes(Number(resultado[0].estatus))) {
        return {
          data: [],
          details: 'El usuario proporcionado se encuentra registrado',
          statusCode: 400,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5005);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 201,
    };
  };

  public registroClientes = async (alta: clientsPOST): Promise<IRespGen<IRespDBGenericaO[]>> => {
    const {
      nombre, telefono,
    } = alta;
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.REGISTRA_CLIENTES.llamarSP(),
      parametros: [nombre, telefono],
    };
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 1 && [0].includes(Number(resultado[0].estatus))) {
        return {
          data: [],
          details: 'El usuario proporcionado se encuentra registrado',
          statusCode: 400,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5005);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 201,
    };
  };

  public registroDireccionUsuario = async (alta: IAddressUsers): Promise<IRespGen<IRespDBGenericaO[]>> => {
    const {
      nombreUsuario, calle, numeroInterior, numeroExterior, referencias, codigoPostal,
    } = alta;
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.REGISTRA_DIRECCION_USUARIO.llamarSP(),
      parametros: [nombreUsuario, calle, numeroInterior ?? '', numeroExterior ?? '', codigoPostal, referencias ?? ''],
    };
    // console.log(JSON.stringify(params.parametros));
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5006);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 201,
    };
  };

  public registroDireccionCliente = async (alta: IAddressUsers): Promise<IRespGen<IRespDBGenericaO[]>> => {
    const {
      idUsuario, calle, numeroInterior, numeroExterior, referencias, codigoPostal,
    } = alta;
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.REGISTRA_DIRECCION_CLIENTE.llamarSP(),
      parametros: [idUsuario, calle, numeroInterior ?? '', numeroExterior ?? '', codigoPostal, referencias ?? ''],
    };
    // console.log(JSON.stringify(params.parametros));
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5006);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 201,
    };
  };

  public registroDispositivos = async (data: IAltaDispositivo): Promise<IRespGen<IRespDBGenericaO[]>> => {
    let resultado: IRespDBGenericaO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.ALTA_DISPOSITIVO.llamarSP(),
      parametros: [
        data.nombreUsuario,
        data.idTipoDispositivo,
        data.serie ?? '',
        data.marca ?? '',
        data.modelo,
        data.descripcionVisual ?? '',
        data.descripcionFalla ?? '',
        data.idCliente,
      ],
    };
    // console.log(JSON.stringify(params.parametros));
    try {
      resultado = await this.db.ejecutarSP<IRespDBGenericaO>(params);
      // console.log(resultado, resultado.length);
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5006);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 201,
    };
  };

  public ConsultaDispositivos = async (data: IConsultaDispositivos): Promise<IRespGen<IConsultaDispositivosO[]>> => {
    const {
      nombreUsuario, idDispositivo,
    } = data;
    let resultado: IConsultaDispositivosO[] = [];
    const params: ISPParams = {
      nombre: this.spListas.CONSULTA_DISPOSITIVO.llamarSP(),
      parametros: [nombreUsuario, idDispositivo || null],
    };
    // console.log(JSON.stringify(params.parametros));
    try {
      resultado = await this.db.ejecutarSP<IConsultaDispositivosO>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: [],
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5006);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 200,
    };
  };

  public consultaTiposDispositivos = async (): Promise<IRespGen<IConsultaTiposDispositivos[]>> => {
    let resultado: IConsultaTiposDispositivos[] = [];
    const params: ISPParams = {
      nombre: this.spListas.CONSULTA_DISPOSITIVO_TIPOS.llamarSP(),
      parametros: [],
    };
    try {
      resultado = await this.db.ejecutarSP<IConsultaTiposDispositivos>(params);
      // console.log(resultado, resultado.length);
      if (resultado.length === 0) {
        return {
          data: [],
          details: EMensajesError.NOT_FOUND,
          statusCode: 204,
        };
      }
    } catch (error) {
      throw errorApi.errorInternoServidor.bd(EMensajesError.ERROR, 5006);
    }
    return {
      data: resultado,
      details: EMensajesError.CREATE,
      statusCode: 200,
    };
  };
}
