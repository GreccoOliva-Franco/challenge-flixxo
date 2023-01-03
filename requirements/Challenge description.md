# Requirements

## Challenge description

The detailed requirements for the challenge are written in the "flixxo-challenge.pdf" file.

## Challenge theorical questions

### ¿Qué es SQL Injection y cómo puede evitarse?

Injección SQL es un tipo de vulnerabilidad de seguridad que implica el uso de los campos que posiblemente use el back para extraer información de la base de datos.

Para ser más exactos, el método aprovecha que las consultas a las bases de datos son mediante scripts SQL y, al ser éstos "scripts", no están limitados a ejecutar una única sentencia SQL, sino que pueden ejecutar varias sentencias SQL, separadas por un punto y coma. Gracias a ello, se puede extraer datos de la DB haciendo uso ingenioso de este defecto.

La solución para evitarlo es "escapando" la entrada de datos. De tal forma, los `;` jamás serán un problema ya que serán tratados como caracteres y no como final de sentencia de SQL.

### ¿Cuándo es conveniente utilizar SQL Transactions? Dar un ejemplo

Dado un conjunto de sentencias SQL, éstas son envidas a la DB en un único bloque llamado "transacción" por cuestiones de consistencia de datos en la DB. Si la totalidad de la operación es exitosa, los cambios impactan en la DB. Caso contrario, existe la posibilidad de deshacer los cambios parciales realizados por la transacción en sí (conocido como proceso "Rollback")

### Describí brevemente las ventajas del patrón controller/service/repository

El patrón controller-service-repository es un patrón de capas que consiste en separar las distintas funcionalidades que se efectuan a lo largo de la ejecución de la funcionalidad que provee un endpoint. Estas distintas funcionalidades son:

1- Controllers: Encargados de la etapa de parseo/mapeo/validación de datos de entrada y salida de/a la API. En ocasiones se pueden llegar a ver validaciones o reglas de negocio extra que no hayan sido posibles implementar en la etapa de middlewares del endpoint. En resumen, deberían estandarizar entrada y salida de datos (a nivel API's) y catchear errores predefinidos.

2- Services: Encargados del procesamiento bruto de los datos, aplicar reglas de negocio, validaciones de datos, consumo de servicios internos o bien externos (API's externas). De ser necesario, realizan el llamado a la capa de persistencia de datos (repository).

3- Repositories: Encargados de la persistencia de datos, esta capa tiene una alta dependencia con los ORM/ODM haciendo que su intercambiabilidad sea menor. En ella se definen funciones de alta utilidad y performance ya que el ORM/ODM no tiene la capacidad de contemplar todos los casos particulares

El fuerte de este patrón es la sencillez de aplicación y alta modularidad que aporta. Ésto no impide el uso de varios patrones de diseño trabajando en conjunto para formar la arquitectura del proyecto.

### ¿Cuál es la mejor forma de guardar un campo de tipo enum en la DB?

Deben haber varias formas pero imagino que la más óptima es un `JSON.stringify(ArrayFromEnumValues)` en un campo varchar o text, según requira el tamaño.

### Usando async/await: ¿cómo se puede aprovechar el paralelismo?

Javascript, gracias a su EventLoop, puede esperar la respuesta de varias operaciones asíncronas. La forma de conseguirlo es con los métodos de las promesas

```js
// Esperar a que todas las promesas se resuelvan correctamente
await Promise.all(promisesArray)

// Esperar a que todas las operaciones asíncronas finalicen y reportar su estado "fulfilled" o "rejected"
await Promise.allSettled(promisesArray)

// Reportar la primer promesa en haberse finalizado correctamente
await Promise.race(promiseArray)
```
