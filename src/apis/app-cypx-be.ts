/* eslint-disable no-useless-constructor */
import { ConfiguracionVariables } from '../config/configuracion-variables-entorno';
import { CredencialesEnum } from '../enums/general.enum';
import { AppGenerico } from './app-generico';

export class AppGsBchCypxBe extends AppGenerico {
  private static instance: AppGsBchCypxBe;
  public constructor(params: {
    credenciales: { usuario: string, password: string },
    dnsApi: string
  }) {
    super(params);
  }
  static getInstance(): AppGsBchCypxBe {
    if (!this.instance) {
      const { usuario, password } = ConfiguracionVariables.CREDENCIALES.find(
        ({ id }) => id === CredencialesEnum.GS_BCH_CYPX_BE,
      ) || { id: 1, usuario: '', password: '' };
      this.instance = new AppGsBchCypxBe({
        credenciales: {
          usuario,
          password,
        },
        dnsApi: ConfiguracionVariables.URL_API_AWS,
      });
    }
    return this.instance;
  }
}
