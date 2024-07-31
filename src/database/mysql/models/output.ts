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
	id_login: string;
	nombre_usuario: string;
	contrasena_login: string;
}