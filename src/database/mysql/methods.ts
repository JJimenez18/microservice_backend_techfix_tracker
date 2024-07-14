import { errorApi } from "@chtalent/apis-common";
import { ConfiguracionBaseDeDatos, ISPParams } from "../../config/configuracion-base-datos";
import { SpListas } from "./store.procedure";
import { IToken } from "./models/output";

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
  
	public tokenEmpleado = async (
	  lcoLogueado: string,
	  token: string | null,
	): Promise<IToken[]> => {
	  let resultado: IToken[] = [];
	  const params: ISPParams = {
		nombre: '',
		parametros: [],
	  };
  
	  if (!token) {
		params.nombre = this.spListas.CONSULTA_TOKEN.llamarSP();
		params.parametros = [lcoLogueado];
		try {
		  resultado = await this.db.ejecutarSP<IToken>(params);
		} catch (error: any) {
		  throw errorApi.errorInternoServidor.bd(
			'Error al obtener token',
		  );
		}
	  }
	  return resultado;
	};
}