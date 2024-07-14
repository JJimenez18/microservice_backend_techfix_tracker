/* eslint-disable no-useless-constructor */
import { ConfiguracionVariables } from '../config/configuracion-variables-entorno';
import { CredencialesEnum } from '../enums/general.enum';
import { AppGenerico } from './app-generico';

export class AppGsBchCyOiBe extends AppGenerico {
  private static instance: AppGsBchCyOiBe;

  public constructor(params: { credenciales: { usuario: string, password: string }, dnsApi: string }) {
    super(params);
  }
  static getInstance(): AppGsBchCyOiBe {
    if (!this.instance) {
      const { usuario, password } = ConfiguracionVariables.CREDENCIALES.find(
        ({ id }) => Number(id) === CredencialesEnum.GS_BCH_CYOI_BE_DEV,
      ) || { id: 1, usuario: '', password: '' };
      this.instance = new AppGsBchCyOiBe(
        {
          credenciales: { usuario, password },
          dnsApi: ConfiguracionVariables.URL_API_ON_DEV,
        },
      );
    }
    return this.instance;
  }
}
