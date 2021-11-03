# shopsrus

Instrucciones para la instalación:

BASE DE DATOS:
- Instalar MySQL Workbench 8.0

- Descomprimir el archivo db.zip

- Desde MySQL Workbench, ejecutar las querys contenidas por los archivos extraídos, DATABASE_CREATION.sql y DATABASE_POPULATION.sql, en ese orden.

APLICACION WEB:
- Instalar NodeJS

- Descomprimir el archivo app.zip

- Dentro de la carpeta extraída de app.zip, abrir una terminal del sistema operativo y ejecutar:
npm install

- Una vez finalizada la instalación, abrir el archivo .env.default y configurar los valores, entre apóstrofos, de las variables con los que correspondan a la conexión de base de datos a utilizar. Luego, guardar el archivo como .env (o renombrar el existente).
Ejemplo
DB_HOST='192.168.1.3'
DB_USER='miUsuario'
DB_PASSWORD='miClave'
DB_NAME='ShopsRUs'

- Para ejecutar la solución, desde la misma terminal ejecute:
npm run start

- La aplicación web se ejecutará en el puerto 3000 por defecto.
Para cambiarlo, edite el archivo app.js dentro de la 
carpeta /src
