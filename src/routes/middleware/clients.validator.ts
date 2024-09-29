import { ValidationChain, body } from 'express-validator';

export const clientsValidationPost = (): Array<ValidationChain> => [
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
];

export const addressClientValidationPOST = (): Array<ValidationChain> => [
  body('idUsuario')
    .notEmpty()
    .trim()
    .withMessage('idUsuario es requerido'),

  body('calle')
    .notEmpty()
    .trim()
    .withMessage('calle es requerido')
    .bail()
    .isLength({ max: 50 })
    .withMessage('calle no puede contener mas de 50 carácteres'),

  body('numeroInterior')
    .optional()
    .notEmpty()
    .trim()
    .withMessage('numeroInterior es requerido')
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage('numeroInterior no puede contener mas de 10 carácteres'),

  body('numeroExterior')
    .notEmpty()
    .trim()
    .withMessage('numeroExterior es requerido')
    .bail()
    .isLength({ min: 1, max: 10 })
    .withMessage('numeroExterior no puede contener mas de 10 carácteres'),

  body('codigoPostal')
    .notEmpty()
    .trim()
    .withMessage('codigoPostal es requerido')
    .bail()
    .isLength({ min: 3, max: 10 })
    .withMessage('codigoPostal no puede contener menos de 3 digitos')
    .bail()
    .isInt()
    .withMessage('codigoPostal debe ser tipo numericos'),

  body('referencias')
    .optional()
    .notEmpty()
    .trim()
    .withMessage('referencias es requerido')
    .bail()
    .isLength({ max: 50 })
    .withMessage('referencias no puede contener mas de 50 carácteres'),
];
