import * as Excel from 'exceljs';
import { promises } from 'fs';
import { crearLogger } from '@chtalent/apis-common';
import { CorreoElectronico, IEmail } from './Correo';

export class ReporteExcel {
    private static instance:ReporteExcel;
    private readonly logger = crearLogger(module);
    static getInstance(): ReporteExcel {
      if (!this.instance) {
        this.instance = new ReporteExcel();
      }
      return this.instance;
    }
    public generarReporteExcelBase64 = async (params:{
        nombreReporte:string,
        datosReporte:any[]
    }):Promise<{hayError:boolean, mensaje:string, detalleReporte:{ tamanio:number,
        tipoArchivo:string, archivoBase64:string } | null}> => {
      const { datosReporte, nombreReporte } = params;
      this.logger.debug(`Generando reporte ${nombreReporte}`);
      const rutaReporte = `${__dirname}/${nombreReporte}`;
      if (datosReporte.length > 0) {
        try {
          const options = {
            filename: rutaReporte,
            useStyles: true,
            useSharedStrings: true,
          };
          const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
          const worksheet = workbook.addWorksheet('Reporte', { properties: { tabColor: { argb: 'FFC0000' } } });
          worksheet.pageSetup.printArea = 'A1:G20';
          worksheet.pageSetup.printArea.fontcolor('red');
          worksheet.pageSetup.blackAndWhite = true;
          worksheet.columns = Object.keys(datosReporte[0]).map((valueKey) => ({
            header: valueKey,
            key: valueKey,
            width: 20,
          }));
          datosReporte.map(async (registro, index) => {
            worksheet.getRow(index + 2).values = { ...registro };
            await worksheet.getRow(index + 2).commit();
          });
          await worksheet.commit();
          await workbook.commit();
          const archivoLeido = await promises.readFile(rutaReporte);
          const archivoBase64 = await Buffer.from(archivoLeido).toString('base64');
          const calcularTamano = await promises.stat(rutaReporte);
          const tamanio = calcularTamano.size;
          const tipoArchivo = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
          await promises.unlink(rutaReporte);
          return {
            hayError: false,
            mensaje: 'reporte generado exitosamente',
            detalleReporte: { tamanio, tipoArchivo, archivoBase64 },
          };
        } catch (error:any) {
          this.logger.error('error al generar reporte, detalle:', JSON.stringify(error));
          return {
            detalleReporte: null,
            hayError: true,
            mensaje: `Error al generar reporte, detalle: ${error.message}`,
          };
        }
      } else {
        return {
          detalleReporte: null,
          hayError: true,
          mensaje: 'No hay datos para generar reporte',
        };
      }
    }
}
