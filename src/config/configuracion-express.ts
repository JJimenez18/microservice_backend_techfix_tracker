/* eslint-disable linebreak-style */
import { errorApi, crearLogger } from '@chtalent/apis-common';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { App } from './app';

export class ConfiguracionExpress {
  private readonly logger = crearLogger(module);
  private static instance: ConfiguracionExpress;

  private constructor() {
    this.logger.debug('Constructor privado de ConfiguracionExpress');
  }

  static getInstance(): ConfiguracionExpress {
    if (!this.instance) {
      this.instance = new ConfiguracionExpress();
    }
    return this.instance;
  }

  inicializar = ():express.Application => {
    const app = App.getInstance();
    app.use(cors({ credentials: true }));
    app.use(cookieParser());
    // app.use(cookies());
    app.use(express.urlencoded({ extended: true }));
    app.use((req: Request, res: Response, next: NextFunction) => {
      express.json({ limit: '25mb' })(req, res, (err) => {
        // console.log(req.headers);
        if (err) {
          try {
            throw errorApi.peticionNoValida.parametrosNoValidos('JSON mal formado, favor de revisarlo').responder(res);
          } catch (error) {
            console.log(error);
          }
        }
        next();
      });
    });
    return app;
  }
}
