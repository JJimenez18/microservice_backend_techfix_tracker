/* eslint-disable max-len */
export enum verbosHttpEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put'
}

export enum EMensajesError {
  OK = 'Consulta exitosa.',
  CREATE = 'Operacion exitosa.',
  NOT_FOUND = 'No se encuentra ningún elemento relacionado a la consulta.',
  ERROR = 'Problemas al procesar su solicitud, favor de contactar a su administrador.',
  NOT_AUTH = 'El x-id-acceso está expirado o no es válido, favor de solicitar uno nuevo',
  NOT_AUTH_REQUEST = 'Lo sentimos, no estás autorizado para acceder a este recurso. Por favor, verifica tus credenciales e inténtalo de nuevo.',
  FORBIDDEN = 'Acceso Denegado.No tienes permiso para acceder a esta página o recurso',
  BAD_REQ = 'No fue posible procesar la información enviada en su solicitud. Verifique por favor.',
  TOKEN = 'JWT está expirado o no es válido, favor de solicitar uno nuevo',
}

export enum SistemasEnum {
  DOCUMENT = 1,
  AURORA = 2,
  CRYPTO = 3,
  APIGEE = 4,
}

export enum CredencialesEnum {
  SAP_FI = 1,
  CPI = 2,
  UTILERIAS = 3,
  GS_BCH_CYOI_BE_DEV = 4,
  GS_BCH_CYOI_BE_QA = 5,
  GS_BCH_CYPA_AP = 6,
  GS_BCH_CYPX_BE = 7
}