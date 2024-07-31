import { errorApi } from "@chtalent/apis-common";
import { ConfiguracionBaseDeDatos, ISPParams } from "../../config/configuracion-base-datos";
import { SpListas } from "./store.procedure";
import { ICredencialesLoginO, IToken } from "./models/output";
import { EMensajesError } from "../../enums/general.enum";

export class MetodosBD {
	private static instance: MetodosBD;
	private readonly db = ConfiguracionBaseDeDatos.getInstance();
	private readonly spListas: SpListas = SpListas.getInstance();

	static getInstance(): MetodosBD {
		if (!MetodosBD.instance) {
			this.instance = new MetodosBD();
		}
		return this.instance;
	}

	public detalleLoginUsuario = async (
		nombreUsuario: string,
	): Promise<ICredencialesLoginO> => {
		let resultado: ICredencialesLoginO[] = [];
		const params: ISPParams = {
			nombre: this.spListas.CREDENCIALES_USUARIO_LOGIN.llamarSP(),
			parametros: [
				nombreUsuario,
			],
		};
		try {
			resultado = await this.db.ejecutarSP<ICredencialesLoginO>(params);
			if (resultado.length === 0) {
				throw errorApi.recursoNoEncontrado.recursoBDNoEncontrado(EMensajesError.NOT_FOUND, 204100)
			}
		} catch (error: any) {
			throw errorApi.errorInternoServidor.bd(
				'Error al obtener token',
			);
		}
		return resultado[0];
	};
}