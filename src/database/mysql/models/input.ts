export interface ICredencialesLoginI {
  nombreUsuario: string;
}

export interface IConsultaDispositivos {
  nombreUsuario: string;
  idDispositivo?: number;
}

export interface IConsultaTiposDispositivos {
  idTipo: number;
  descripcion: string;
}

export interface IAltaDispositivo {
  nombreUsuario: string;
  idTipoDispositivo: number;
  serie: string;
  marca: string;
  modelo: string;
  descripcionVisual?: string;
  descripcionFalla: string;
  idCliente: number;
}
