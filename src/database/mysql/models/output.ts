export interface IToken {
  idEmpleado: string;
  token: string;
  idFormador: string;
  nombreFormador: string;
  tokenFormador: string;
  fechaModifico: string;
  estatus: string;
  descripcion: string;
}

export interface ICredencialesLoginO {
  idLogin: string;
  nombreUsuario: string;
  contrasenaLogin: string;
  email: string;
  idTipoUsuario: number;
}

export interface IDireccionesUsuariosO {
  // usuario: string;
  idDireccion: number;
  calle: string;
  numeroInterior: string;
  numeroExterior: string;
  codigoPostal: string;
  referencias: string;
}

export interface IRespDBGenericaO {
  mensaje: string;
  estatus: number;
}

export interface IConsultaDispositivosO {
  idDispositivo: number;
  nombreUsuario: string;
  idTipoDispositivo: number;
  serie: string;
  marca: string;
  modelo: string;
  descripcionVisual: string;
  descripcionFalla: string;
  fechaRegistro: string;
  idEstatusDispositivo: number;
  idCliente: number;
  nombreCliente: string;
  descTipoDispositivo: string;
}

export interface IConsultaFallasDispositivos {
  idDispositivo: string;
  idTecnicoRegistra: string;
  descripcion: string;
  reparacionSugerida: string;
  fechaModificacion: string;
}
