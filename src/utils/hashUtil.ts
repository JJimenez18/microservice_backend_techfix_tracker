import { randomBytes, pbkdf2 } from 'crypto';

// Parámetros de PBKDF2
const saltLength = 16;
const iterations = 100000;
const keyLength = 64;
const digest = 'sha512';

// Función para generar un hash de contraseña
export const getHashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Generar un salt aleatorio
    const salt = randomBytes(saltLength).toString('hex');

    // Generar el hash usando PBKDF2
    pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
      if (err) return reject(err);

      // Devuelve el hash en formato: salt:hash
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

// Función para verificar una contraseña
function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Extraer el salt del hash almacenado
    const [salt, key] = hash.split(':');

    // Generar el hash de la contraseña proporcionada usando el mismo salt
    pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
      if (err) return reject(err);

      // Comparar el hash generado con el hash almacenado
      resolve(key === derivedKey.toString('hex'));
    });
  });
}

// Ejemplo de uso
/* const myPlaintextPassword = 's0/\\/\\P4$$w0rD';

getHashPassword(myPlaintextPassword)
  .then(hash => {
    console.log(`Hash almacenado: ${hash}`);

    // Verificar la contraseña correcta
    verifyPassword(myPlaintextPassword, hash)
      .then(match => {
        console.log(`Contraseña correcta: ${match}`); // true
      })
      .catch(err => {
        console.error(err);
      });

    // Verificar una contraseña incorrecta
    verifyPassword('not_bacon', hash)
      .then(match => {
        console.log(`Contraseña correcta: ${match}`); // false
      })
      .catch(err => {
        console.error(err);
      });
  })
  .catch(err => {
    console.error(err);
  });
 */

export const validaPassAlmacenada = async (passRequest: string, hashDB: string):Promise<boolean>  => {
  console.log(`Hash almacenado: ${hashDB}`);
  try {
    const match = await verifyPassword(passRequest, hashDB);
    console.log(`Contraseña correcta: ${match}`); // true
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}