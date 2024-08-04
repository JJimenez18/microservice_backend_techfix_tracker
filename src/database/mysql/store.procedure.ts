import { ISPDetalle } from '../../models/general';

export class SpListas {
  private static instance: SpListas;
  private nombreDb = 'techfix_tracker_db';

  static getInstance(): SpListas {
    if (!this.instance) {
      this.instance = new SpListas();
    }
    return this.instance;
  }

  public CREDENCIALES_USUARIO_LOGIN: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Valida_Login',
    numParams: 1,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public VALIDA_NOMBRE_USUARIO_DISPONIBLE: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_usuario_disponible',
    numParams: 1,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public DIRECCIONES_USUARIO: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Consulta_Direcciones',
    numParams: 1,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public DIRECCIONES_ID: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Consulta_Direccion_ID',
    numParams: 2,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public DELETE_DIRECCIONES_ID: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Borrado_Direcciones',
    numParams: 2,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public REGISTRA_USUARIO: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Alta_Usuario',
    numParams: 5,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  public REGISTRA_DIRECCION_USUARIO: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_Alta_Direcciones',
    numParams: 6,
    parametros: this.getParams,
    llamarSP: this.llamarSP,
  };

  llamarSP(this: ISPDetalle): string {
    return `CALL ${this.nombreDb}.${this.nombreSp}${this.parametros()}`;
  }

  getParams(this: ISPDetalle): string {
    let params = '(';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.numParams; i++) {
      params += '?';
      if (i !== this.numParams - 1) params += ',';
    }
    params += ')';
    return params;
  }
}
