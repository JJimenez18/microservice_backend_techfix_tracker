import nodemailer from 'nodemailer';
import { crearLogger } from '@chtalent/apis-common';

export interface IEmail{
    archivos?:{
        nombre:string,
        base64:string;
    }[],
    destinatarios: {correo:string}[];
    destinatariosCC?:{correo:string}[],
    mensaje:string,
    mensajeHtml?:string;
    asunto:string,
    credenciales:{ usuario:string, contrasena:string}
}
export class CorreoElectronico {
    private static instance:CorreoElectronico;
    private readonly logger = crearLogger(module);
    static getInstance(): CorreoElectronico {
      if (!this.instance) {
        this.instance = new CorreoElectronico();
      }
      return this.instance;
    }

     enviarCorreoAsync = async (
       params: IEmail,
     ):Promise<{hayError: boolean, mensaje:string}> => new Promise((resolve, reject) => {
       const {
         asunto, destinatarios, mensaje, archivos, destinatariosCC, credenciales, mensajeHtml,
       } = params;
       const transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
           user: credenciales.usuario,
           pass: credenciales.contrasena,
         },
         tls: { rejectUnauthorized: false },
       });
       const mailOptions = {
         from: 'Remitente',
         to: destinatarios ? destinatarios.map((em) => `${em.correo};`) : '',
         cc: destinatariosCC ? destinatariosCC.map((em) => `${em.correo};`) : '',
         subject: asunto,
         text: mensaje,
         html: mensajeHtml || undefined,
         attachments: archivos ? archivos.map((arch) => ({
           filename: arch.nombre,
           content: arch.base64,
           encoding: 'base64',
         })) : undefined,
       };
       transporter.sendMail(mailOptions, (error: any, info: any) => {
         if (error) {
           this.logger.error(`Error al enviar correo ->  ${error.message}`);
           resolve({ hayError: true, mensaje: `error is ${error.message}` });
         }
         this.logger.debug(`Correo enviado: ${info.response}`);
         resolve({ hayError: false, mensaje: `Email sent: ${info.response}` });
       });
     });
}
