import { ISPDetalle } from '../../models/general';

export class SpListas {
  private static instance: SpListas;
  private nombreDb = 'nombreBaseDatos';

  static getInstance(): SpListas {
    if (!this.instance) {
      this.instance = new SpListas();
    }
    return this.instance;
  }

  public CONSULTA_TOKEN: ISPDetalle = {
    nombreDb: this.nombreDb,
    nombreSp: 'SP_nombre',
    numParams: 1,
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
