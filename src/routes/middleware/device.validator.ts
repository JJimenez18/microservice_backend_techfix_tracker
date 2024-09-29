import { ValidationChain, body } from 'express-validator';

export const deviceValidationPost = (): Array<ValidationChain> => [
  body('nombreUsuario')
    .notEmpty()
    .trim()
    .withMessage('nombreUsuario es obligatorio')
    .bail()
    .isLength({ min: 8 })
    .withMessage('nombreUsuario debe contener minimo 8 carácteres'),

  body('idTipoDispositivo')
    .notEmpty()
    .trim()
    .withMessage('idTipoDispositivo es obligatorio')
    .bail()
    .isInt({ min: 1, max: 20 })
    .withMessage('idTipoDispositivo no es valido'),

  body('serie')
    .notEmpty()
    .trim()
    .withMessage('serie es obligatorio')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('serie debe contener de 3 - 50 carácteres'),

  body('marca')
    .notEmpty()
    .trim()
    .withMessage('marca es obligatorio')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('marca debe contener de 3 - 50  carácteres'),

  body('modelo')
    .notEmpty()
    .trim()
    .withMessage('modelo es obligatorio')
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage('modelo debe contener de 3 - 50  carácteres'),

  body('descripcionVisual')
    .optional()
    .notEmpty()
    .trim()
    .withMessage('descripcionVisual es obligatorio')
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage('descripcionVisual debe contener de 3 - 200 carácteres'),

  body('descripcionFalla')
    .notEmpty()
    .trim()
    .withMessage('descripcionFalla es obligatorio')
    .bail()
    .isLength({ min: 3, max: 200 })
    .withMessage('descripcionFalla debe contener de 3 - 200 carácteres'),

  body('idCliente')
    .notEmpty()
    .trim()
    .withMessage('idCliente es obligatorio')
    .bail()
    .isInt({ min: 1, max: 200000000 })
    .withMessage('idCliente no es valido'),
];
