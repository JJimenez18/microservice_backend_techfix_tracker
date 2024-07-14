import { ValidationChain, body } from 'express-validator';

export const generaTokenValidation = (): Array<ValidationChain> => [
  body('username').notEmpty().trim().withMessage('username es obligatorio'),
  body('password').notEmpty().trim().withMessage('password es obligatorio'),
];
