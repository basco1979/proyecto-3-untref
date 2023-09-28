# Proyecto Integral N°3

El presente documento, es el **Proyecto Integral N°3** de ***Argentina Program 4.0***. Esta es una pequeña solución informática que sirve administrar el contenido de la plataforma Trailerflix.
La misma, fue diseñada y construida sobre una arquitectura API RESTful, la cual está desarrollada bajo las restricciones y recomendaciones de REST, además, implementa buenas prácticas de programación.

#### Especificaciones
- Servidor: http://127.0.0.1:3305
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
    │   └── modelos
    │     └── actor.js
    │     └── catalogo.js
    │     └── categoria.js
    │     └── genero_catalogo.js
    │     └── genero.js
    │     └── index.js
    │     └── reparto.js
    │   └── server.js
    ├── .env.dist
    ├── .eslintrc.json
    ├── .gitignore
    ├── connection_db.js
    ├── crear_tablas.sql
    ├── package.json
    ├── package-lock.json 
    └── README.md
    └── trailerflix.json
```

---
### CONFIGURACION DE ENTORNO
  - #### VARIABLES DE ENTORNO
    Se debe hacer una copia del archivo **.env.dist** y renombrarlo como **.env**. Con respecto a su contenido, es necesario asignar los valores a correspondientes a las variables:
    ``` js
        SERVER_PORT=3305
        SERVER_HOST=127.0.0.1
        DATABASE_HOST=127.0.0.1
        DATABASE_PORT=3306
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
| GET | http://127.0.0.1:3005/catalogo | Obtiene los registros (permite filtros) |
| GET | http://127.0.0.1:3005/catalogo/1 | Obtiene un registro en específico |
| GET | http://127.0.0.1:3005/catalogo/titulo/Riverdale | Filtrar por titulo o parte del titulo |
| GET | http://127.0.0.1:3005/catalogo/genero/Drama | Filtrar por genero |
| GET | http://127.0.0.1:3005/catalogo/categoria/Serie | Filtrar por categoria |
| GET | http://127.0.0.1:3005/categorias | Obtiene todas las categorias |
| POST | http://127.0.0.1:3005/catalogo | Crea un nuevo registro |
| PUT | http://127.0.0.1:3005/catalogo/1 | Modifica un registro en específico |
| DELETE | http://127.0.0.1:3005/catalogo/1 | Elimina un registro en específico |


#### Método GET:
- Request:
  - Parámetros opcionales de tipo PARAMS:
    - /titulo/Westworld  *(tipo: string. Trae el contenido del titulo filtrado. Puede ser parte del titulo)* 
    - /genero/Drama  *(tipo: string. Trae los titulos del genero filtrado)* 
    - /categoria/Serie *(tipo: string. Trae los titulos de la categoria filtrada)* 
- Response:
    ``` json
        [
            {
                "id": 16,
                "titulo": "Westworld",
                "poster": "http://localhost:3305/catalogo/posters/16.jpg",
                "categoria": "Serie",
                "genero": "Ciencia Ficción,Western",
                "resumen": "'Westworld' es una oscura odisea acerca del amanecer de la conciencia artificial y la evolución del pecado. Situada en la intersección del futuro cercano y el pasado reimaginado, explora un mundo donde cada apetito humano, sin importar cuán noble o depravado, puede ser saciado. Está ambientada en un parque temático futurista dirigido por el Dr. Robert Ford (Anthony Hopkins). Las instalaciones cuentan con androides caracterizados del western americano, y gracias a ellos los visitantes pueden introducirse en cualquier tipo de fantasía por muy oscura que sea.",
                "temporadas": 3,
                "reparto": "Ed Harris,Evan Rachel Wood,Jeffrey Wright,Luke Hemsworth,Tessa Thompson,Thandie Newton",
                "trailer": "https://www.youtube.com/embed/qLFBcdd6Qw0"
            }
        ]
    ```
  - Código HTTP: **200** *Devuelve el titulo o titulos filtrados*
  - Código HTTP: **500** *message: Se ha generado un error en el servidor*


#### Método GET - Específico:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 9 *(tipo: integer. Indica el código del catalogo que se requiere obtener)*
- Response:
    ``` json
        {
        "id": 9,
        "titulo": "Juego de tronos",
        "poster": "http://localhost:3305/catalogo/posters/9.jpg",
        "categoria": "Serie",
        "genero": "Aventura,Drama,Fantasía",
        "resumen": "En un mundo fantástico y en un contexto medieval varias familias, relativas a la nobleza, se disputan el poder para dominar el territorio ficticio de Poniente (Westeros) y tomar el control de los Siete Reinos desde el Trono de Hierro, lugar donde el rey ejerce el poder.",
        "temporadas": 8,
        "reparto": "Emilia Clarke,Kit Harington,Lena Headey,Nikolaj Coster-Waldau,Peter Dinklage,Sophie Turner",
        "trailer": ""
        }
    ```
  - Código HTTP: **200** *Devuelve el titulo seleccionado*
  - Código HTTP: **400** *message: Id tiene que ser un numero*
  - Código HTTP: **404** *message: Id no encontrado*
  - Código HTTP: **500** *message: Error en el servidor*


#### Método POST:
- Request:
  - Parámetros requeridos del BODY:
    - titulo='Rambo' *(tipo: string. Establece el título del contenido)* 
    - poster='/posters/36.jpg'  *(tipo: string. Establece el poster del título)* 
    - categoria='Pelicula'  *(tipo: string. Establece la categoría del título)* 
    - genero=['Acción', 'Suspenso']  *(tipo: array de strings. Establece los géneros del título)* 
    - resumen='Rambo contra los soviéticos'        *(tipo: string. Establece el resumen del título)* 
    - temporadas=0  *(tipo: int. Establece la cantidad de temporadas)* 
    - actor= ['Silvester Stallone', 'Yashin Versek'] *(tipo: array de strings. Establece los actores del título)*
    - trailer=""       *(tipo: string. Establece el link del trailer)*

  ``` json
  {
    "titulo": "Rambo",
    "poster": "/posters/36.jpg",
    "categoria": "Pelicula",
    "genero": ["Acción", "Suspenso"],
    "resumen": "Rambo contra los soviéticos",
    "temporadas": 0,
    "actor": ["Silvester Stallone", "Yashin Versek"],
    "trailer": ""
  }
 ```

- Response:
  - Código HTTP: **201** *message: 'Registro creado'*
  - Código HTTP: **400** *message: Faltan datos relevantes*
  - Código HTTP: **500** *message: Error en el servidor*
- Nota: *Los valores indicados en el ejemplo, son datos esperados en los tests.*


#### Método PUT:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 16 *(tipo: integer. Indica el código del catalogo que se requiere modificar)*
  - Parámetros requeridos del BODY:
    - titulo=El Gran Pez *(tipo: string. Establece el valor del titulo)* 
    - poster=...        *(tipo: string. Establece el poster del titulo)* 
    - resumen=...        *(tipo: string. Establece el resumen del titulo)* 
    - temporadas=0       *(tipo: int. Establece la cantidad de temporadas)* 
    - trailer=...       *(tipo: int. Establece el link del trailer)* 
- Response:
  - Código HTTP: **200** *message: 'Registro actualizado', payload: mueble*
  - Código HTTP: **400** *message: Id no encontrado*
  - Código HTTP: **400** *message: Faltan datos relevantes*
  - Código HTTP: **500** *message: Error en el servidor*
- Nota: *Los valores indicados en el ejemplo, son datos esperados en los tests.*


#### Método DELETE:
- Request:
  - Parámetro obligatorio de tipo URL:
    - 16 *(tipo: integer. Indica el código del catalogo que se requiere eliminar)*
- Response:
  - Código HTTP: **200** *message: 'El producto de id: 16 fue eliminado con éxito.'*
  - Código HTTP: **500** *message: Error en el servidor*
- Nota: *Los valores indicados en el ejemplo, son datos esperados en los tests.*
