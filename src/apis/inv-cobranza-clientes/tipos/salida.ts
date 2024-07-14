export interface ICobranzaBusquedasNombre {
    cliente: {
        nombre: string;
        apellidoPaterno: string;
        apellidoMaterno: string;
        genero: string;
        fechaNacimiento: string;
        estadoCivil: string;
        correoElectronico: string;
    },
    clienteUnico: {
        idPais: string;
        idCanal: string;
        idSucursal: string;
        folio: string;
    }
}
