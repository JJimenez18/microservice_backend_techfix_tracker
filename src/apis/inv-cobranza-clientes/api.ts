/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { v4 as uuidv4 } from 'uuid';
import { AppGsBchCyOiBe } from '../app-cyoi-be';
import { IRespuestaGenerica } from '../../models/general';
import { ICobranzaBusquedasNombre } from './tipos/salida';
import { IBusquedaNombreCyC } from './tipos/entrada';
import { SistemasEnum } from '../../enums/general.enum';

// const cifrado = Encriptado.getInstance();
// const logger = LoggerS3.getInstance().getLogger();
const xIdPlataforma = 11;
export class InvestigacionCobranzaClientes {
  private readonly appGsBchCyOiBe: AppGsBchCyOiBe = AppGsBchCyOiBe.getInstance();

  private static instance: InvestigacionCobranzaClientes;
  static getInstance(): InvestigacionCobranzaClientes {
    if (!this.instance) {
      this.instance = new InvestigacionCobranzaClientes();
    }
    return this.instance;
  }

  public clientesBusquedasNombre = async (
    data: {
      datos: IBusquedaNombreCyC,
    },
  ): Promise<IRespuestaGenerica<any>> => {
    const { datos } = data;
    const { llave } = await this.appGsBchCyOiBe.generarLLaves('/cobranza-credito/investigacion-cobranza/seguridad/v1/aplicaciones/llaves');
    if (!llave) return { codigoHttp: 500, detalles: 'Error al generar llave de seguridad' };

    const { estatus, detalles: det, resultado } = await this.appGsBchCyOiBe.ejecutarPeticion<ICobranzaBusquedasNombre[]>({
      sistema: SistemasEnum[SistemasEnum.APIGEE],
      data: datos,
      recurso: '/cobranza_credito/investigacion-cobranza/clientes/v1/busquedas/nombre',
      verbo: 'POST',
      header: {
        'x-id-acceso': llave.idAcceso,
        'x-id-interaccion': uuidv4(),
        'x-id-plataforma': xIdPlataforma,
        // 'x-id-sucursal': '1234',
      },
    });
    if (!resultado) return { codigoHttp: estatus, detalles: det };
    const client: any = { clientes: [] };
    resultado.forEach((c) => {
      client.clientes.push({
        nombre: c.cliente.nombre,
        apellidoPaterno: c.cliente.apellidoPaterno,
        apellidoMaterno: c.cliente.apellidoMaterno,
        idGenero: c.cliente.genero,
        fechaNacimiento: c.cliente.fechaNacimiento,
        estadoCivil: c.cliente.estadoCivil,
        correo: c.cliente.correoElectronico,
        clienteUnico: { ...c.clienteUnico },
      });
    });
    return { codigoHttp: 200, resultado: client, detalles: 'ok' };
  }
}
