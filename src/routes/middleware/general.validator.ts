import { body, ValidationChain } from 'express-validator';

export const nombreUsuarioValidation = (): Array<ValidationChain> => [
  body('nombreUsuario').notEmpty().trim().withMessage('nombre de usuario es requerido'),
];
