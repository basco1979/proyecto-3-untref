# Proyecto Integral N°3

El presente documento, es el **Proyecto Integral N°3** de ***Argentina Program 4.0***. Esta es una pequeña solución informática que sirve administrar los registros de la plataforma Trailerflix.
La misma, fue diseñada y construida sobre una arquitectura API RESTful, la cual está desarrollada bajo las restricciones y recomendaciones de REST, además, implementa buenas prácticas de programación.

#### Especificaciones
- Servidor: http://127.0.0.1:3005
- Autor: Sebastian Basconcelo

#### Requerimientos
- Node.js v18.17.0
- MySQL
- GIT v2.40.1
- IDE - Visual Studio Code v1.78.2

#### Estructura de directorios
``` tree
    ├── node_modules
    ├── src
    │   └── server.js
    ├── .env
    ├── .env.dist
    ├── .eslintrc.json
    ├── .gitignore
    ├── connection_db.js
    ├── crear_tablas.sql
    ├── package.json
    ├── package-lock.json 
    └── README.md
```

---
### CONFIGURACION DE ENTORNO
  - #### VARIABLES DE ENTORNO
    Se debe hacer una copia del archivo **.env.dist** y renombrarlo como **.env**. Con respecto a su contenido, es necesario asignar los valores a correspondientes a las variables:
    ``` js
        SERVER_PORT=3005
        SERVER_HOST=127.0.0.1
        DATABASE_HOST=127.0.0.1
        DATABASE_PORT=3307
        DATABASE_USER=tu-user
        DATABASE_PASSWORD=tu-password
        DATABASE_NAME=trailerflix
    ```


 - #### ERRORES & FORMATOS
    La comprobación de errores y formatos se ejecuta por medio del comando ***npm run eslint***. se hace por medio de Eslint. Para visualizar los errores en tiempo de escritura, se debe tener instalada la extensión de **Eslint** en Visual Studio Code.
    
---
### MÓDULO DE CONTENIDO

Este módulo permite la gestión del contenido. El mismo, ofrece funciones para agregar, modificar, borrar o leer el registro del contenido. Además, permite visualizar reportes filtrados por diferentes criterios de búsqueda.

#### Métodos HTTP
| Tipo | URI | Descripción |
|------|-----|-------------|
| GET | http://127.0.0.1:3005/api/v1/contenido | Obtiene los registros (permite filtros) |
| GET | http://127.0.0.1:3005/api/v1/contenido/1 | Obtiene un registro en específico |
| POST | http://127.0.0.1:3005/api/v1/contenido | Crea un nuevo registro |
| PUT | http://127.0.0.1:3005/api/v1/contenido/1 | Modifica un registro en específico |
| DELETE | http://127.0.0.1:3005/api/v1/contenido/1 | Elimina un registro en específico |


