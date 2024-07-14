import express from 'express';

export class App {
  private static instance: express.Application;

  static getInstance(): express.Application {
    if (!App.instance) {
      App.instance = express();
    }

    return App.instance;
  }
}
