/* eslint linebreak-style: ["error", "windows"] */

import { ValidationChain } from 'express-validator';

export const formatoFecha = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{3}[zZ])?$/;
export const msjFormatoFecha = 'YYYY-MM-DDTHH:mm:ss o YYYY-MM-DDTHH:mm:ss.sssZ';

export const validarCampoFecha = (
  validation: ValidationChain, nombreCampo: string,
): ValidationChain => {
  validation.trim().notEmpty().withMessage(`${nombreCampo} es requerido`).bail();
  return validation.isISO8601({ strictSeparator: true, strict: true })
    .withMessage(`${nombreCampo} no es válida`).bail()
    .matches(formatoFecha)
    .withMessage(`${nombreCampo} debe tener formato ${msjFormatoFecha}`)
    .bail();
};
