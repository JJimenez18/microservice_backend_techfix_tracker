import { Types, Document } from 'mongoose';
import { Request } from 'express';

export interface IBitacoraLogsApp extends Document {
  _id?: Types.ObjectId;
  idSistema: string;
  descripcionSistema?: string;
  accion: string;
  url: string;
  entrada: string;
  salida: string;
  comentario?: string;
  simulador?: string;
  usuario: string;
  fechaModifica: Date;
}