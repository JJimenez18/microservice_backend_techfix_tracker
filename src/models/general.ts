export interface IRespuestaGenerica<T> {
    codigoHttp: number
    resultado?: T
    detalles: string
}

export interface ISPDetalle {
    nombreDb: string;
    nombreSp: string;
    numParams: number;
    parametros: () => string;
    llamarSP: () => string;
}