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
