export interface ISPDetalle {
  nombreDb: string;
  nombreSp: string;
  numParams: number;
  parametros: () => string;
  llamarSP: () => string;
}

export interface IRespGen<T> {
  statusCode: number;
  details: string;
  data: T;
}

export const codeSuccess = [204, 200];
