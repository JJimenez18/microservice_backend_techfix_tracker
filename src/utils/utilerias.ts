/* eslint-disable max-len */
export const formatearCadenaParaComparar = (cadena:string):string => `${cadena}`.replace(/^(0+)/g, '').trim();

export const compararCadenas = (cadena1:string, cadena2:string):boolean => formatearCadenaParaComparar(cadena1) === formatearCadenaParaComparar(cadena2);

export const detectMimeType = (b64: string): string => {
  const signatures = {
    JVBERi0: 'application/pdf',
    R0lGODdh: 'image/gif',
    R0lGODlh: 'image/gif',
    iVBORw0KGgo: 'image/png',
    '/9j/': 'image/jpg',
  };
  let ext = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(signatures)) {
    if (b64.indexOf(key) === 0) ext = value as string;
  }
  return ext;
};
