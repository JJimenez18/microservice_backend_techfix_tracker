# CONFIGURACIÓN

Se deben configurar correctamente las siguientes variables en el package.json

* `name` : Nombre del proyecto
* `version` : Versión actual del proyecto
* `image_name`: Nombre de la imagen, por lo general lleva el dominio del registry.
* `image_name_and_version`: Tag y versión de la imagen junto con el dominio del registry. Debe llevar la siguiente estructura:
`<dominio-registry>/<nombre-image>:<version>`
* `aws_ecr`: Dominio del registry. Por Ejemplo: 1111111.dkr.ecr.us-east-1.amazonaws.com,
* `aws_ecr_region`: Nombre de la región de aws en donde está alojado el registry. Por Ejemplo: us-east-1
* `Repository.url`: Url del repositorio de código.

# INSTALAR DEPENDENCIAS
Ejecutar en la consola el siguiente comando: `npm install`.
* Nota: Instalar la versión más actual del paquete `@chtalent/apis-common`.
* El proyecto ya incluye la integración con MongoDB, si se va a utilizar otra BD, quitar las dependencias: mongoose, @types/mongoose y el código correspondiente.

# AGREGAR LAS VARIABLES DE ENTORNO EN EL ARCHIVO .ENV QUE SE UTILIZARÁN EN DESARROLLO
Las siguientes variables son obligatorias:
* `APP_PUERTO`: Puerto por el que se levantará la aplicación.
* `API_NOMBRE`: Nombre de la API
* `API_NOMBRE_CORTO`: Nombre corto que aparecerá en el campo `folio` dentro de las respuestas de cada petición.
* `APP_RUTA_BASE`: Ruta base que utilizarán todos los endpoints.
* `BD_URL`: Url de la base de datos.
* `API_LIGA_DEVELOPERS`: Url del portal de desarrolladores de gobierno de apis.
* `API_LIGA_ERRORES`: Url que provee el detalle de los codigos de error dentro del portal de desarrolladores.
* Nota: 
  - Si se desean agregar más variables obligatorias, la validación se hace en el archivo: `/src/config/configuracion-variables-entorno.ts`
  - Si se va a utilizar una conexión a BD que requiera de multiples parámetros, estos se debe agregar en el archivo .env y validarlos en el archivo de configuración que se mencionó en el paso anterior. Adicionalmente se debe remover la variable `BD_URL`.

## Métodos de monitoreo
Las funciones de monitoreo se encuentran en `/src/config/configuracion-rutas.ts`
* `Monitoreo  vivo`: Su función es validar si el proyecto está corriendo. Esta función ya se encuentra implementada en el paquete `@chtalent/apis-common`, por lo que no es necesario realizar ninguna acción.
* `Monitoreo disponible`: Su función es similar a `monitoreo vivo`, pero se debe implementar una funcionalidad adicional que indique que el proyecto está corriendo y que lo está haciendo de forma adecuada. Por lo general, en esta función se implementa una validación de conexión a la base de datos. Si es correcta, se devuelve un estatus 200, en caso contrario, se debe lanzar un error. Este mètodo es **obligatorio**.
* `Monitoreo desconectar`: Su función es realizar la desconexión a la BD bajo demanda. Este método **no es obligatorio**.

## Métodos de base de datos
Las funciones de base de datos se encuentran en `/src/config/configuracion-base-datos.ts`
Estas funciones están implementadas para una base de datos MongoDB. Si se va a utilizar otro tipo de base de datos, se deberá modificar la implementación para que el servicio siga teniendo la misma funcionalidad.
La funcionalidad es la siguiente:
`revisarReq`: Función `MIDDLEWARE` que realiza una prueba de conexión con la base de datos. Esta función está pensada para ejecutarse antes de que la solicitud llegue al controlador final, cuando así se requiera.
Si no se detecta conexión, lanza un error.
`desconectar`: Función que cierra las conexiones de la base de datos.
`desconectarReq`: Función que cierra las conexiones de la base de datos con base en una petición al endpoint `/monitoreo/desconectar`.
`monitoreoReq`: Función pensada para ser Readiness Probe y validar que el proyecto está funcionando correctamente. Esta es la función que se ejecutaría cuando se invoca el endpoint `/monitoreo/disponible`.

## Túnel hacia DocumentDB
Antes de corres la aplicación debe tener en ejecución el tunel. La estructura del comando es la siguiente:
`ssh -i <llave-de-instancia.pem> -L <puerto-local>:<dominio-documentdb>:<puerto-documentdb> <usuario-instancia>@<ip-o-dominio-instancia> -N`

# MODIFICAR DOCKERFILE
Modificar la línea 2 del Dockerfile en donde se agrega una etiqueta. Esta etiqueta sirve para poder borrar la imagen que se usa para hacer el build.
La etiqueta debe tener la siguiente estructura: `LABEL stage="builder_`<nombre_proyecto>`"`.
* `nombre_proyecto`: Debe ser igual al nombre que se pone en el campo `name` dentro del `package.json`. Por ejemplo: `LABEL stage="builder_bajas"`.

# EJECUTAR LA APLICACIÓN EN LOCAL
Ejecutar el siguiente comando:
* `npm run dev`

# EJECUTAR APLICACIÓN EN DESARROLLO Y PRODUCCIÓN

* En ambiente de desarrollo o producción la aplicación será ejecutada según lo establecido en el Dockerfile.

# SCRIPTS

Los scripts se ejecutan de la siguiente forma:

* npm run <nombre-script>
Por ejemplo: npm run dev

Los scripts más utilizados son los siguientes:

* dev : Ejecuta la aplicación en modo de local. Levanta un servidor web.
* test: Ejecuta las pruebas unitarias.
* eslint: Ejecuta la validación de calidad de código con base en las reglas establecidas.
* build: Compila la aplicación.
* docker:build : Elimina la imagen del proyecto(en caso de existir) y crea una nueva.
* docker:ecr:login : Hace el login al registry ECR de AWS. Para realizar este paso, ya debe estar configurado el aws-cli con las credenciales correspondientes.
* docker:ecr:push : Hace el login al registry ECR de AWS  y sube la imagen al registry ECR.