/* eslint-disable no-useless-constructor */
import { ConfiguracionVariables } from '../config/configuracion-variables-entorno';
import { CredencialesEnum } from '../enums/general.enum';
import { AppGenerico } from './app-generico';

export class AppGsBchCyOiBeQA extends AppGenerico {
  private static instance: AppGsBchCyOiBeQA;

  public constructor(params: { credenciales: { usuario: string, password: string }, dnsApi: string }) {
    super(params);
  }
  static getInstance(): AppGsBchCyOiBeQA {
    if (!this.instance) {
      const { usuario, password } = ConfiguracionVariables.CREDENCIALES.find(
        ({ id }) => Number(id) === CredencialesEnum.GS_BCH_CYOI_BE_QA,
      ) || { id: 1, usuario: '', password: '' };
      this.instance = new AppGsBchCyOiBeQA(
        {
          credenciales: { usuario, password },
          dnsApi: ConfiguracionVariables.URL_API_ON_QA,
        },
      );
    }
    return this.instance;
  }
}
