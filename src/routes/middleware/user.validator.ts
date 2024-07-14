import { ValidationChain, body } from 'express-validator';

export const userValidationPost = (): Array<ValidationChain> => [
  body('nombre')
    .notEmpty()
    .trim()
    .withMessage('nombre es obligatorio')
    .bail()
    .isLength({ min: 10 })
    .withMessage('nombre debe contener minimo 10 carácteres'),
  body('telefono')
    .notEmpty()
    .trim()
    .withMessage('telefono es obligatorio')
    .bail()
    .isLength({ min: 10 })
    .withMessage('telefono debe contener minimo 10 carácteres'),
  body('email')
    .notEmpty()
    .trim()
    .withMessage('email es obligatorio')
    .bail()
    .isEmail()
    .withMessage('email proporcionado no es valido'),
  body('contrasenia')
    .notEmpty()
    .trim()
    .withMessage('contrasenia es obligatorio')
    .bail()
    .isLength({ min: 15 })
    .withMessage('contrasenia debe contener minimo 15 carácteres'),
];
