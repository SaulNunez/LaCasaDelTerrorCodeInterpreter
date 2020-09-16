# Microservicio de procesamiento de código

Para el juego se necesitaba una forma de procesar el codigo que crea el jugador con el editor de bloques. Y por seguridad corre en un interprete, es una librería externa que mediante su API podemos crear algunas funciones mock para poder escuchar sus resultados fuera de la "máquina virtual".

Algunas de las funciones de este procesamiento de código son las siguientes
* Obtener salida estandar del programa
* Saber si el código tiene cierta estructura procedurimental

## API
### Endpoint `./`

Este endpoint soporta JSON y form urlencoded.  
Ejemplo de uso:

```json
{
    "code": "alert('Hola mundo')",
    "expectedOutput": "Hola mundo",
    "checkType": "check_for_branching",
    "functionChecks": [
      {
        "name": "sum",
        "parameters": [2, 2],
        "output": 4
      },
      {
        "name": "hello",
        "parameters": ["world"],
        "output": "hello world"
      }
    ]
}
```

* `code`: Contiene el código a probar.   
* `expectedOutput`: Es la salida a comparar. Si la salida tiene varias lineas, se necesita concatenarlas un espacio para poderlas comparar. Ej. una salida en cada linea de \["0", "1", "2"\] se compararía con "0 1 2".  
* `checkType`: Es el tipo de prueba a realizar en código de estructura. Acepta los siguiente valores: 
    * `check_for_branching`
    * `check_for_loops`
    * `check_for_functions`
* `checkFunctionExists`: Funciones que debería tener el *snippet* de código.
* `functionChecks`: Un objeto que contiene información sobre las pruebas funcionales que se harán a las funciones mandadas por el cliente. 

Salida esperada

```json
{
  "runOutput": [
    "Hola mundo"
  ],
  "matchesOutput": true,
  "passedCheck": true,
  "hasFunctions": true
}
```
* `runOutput`: La salida linea por linea de ejecutar el programa.
* `matchesOutput`: Resultado de la comparación de la salida con lo esperado.
* `passedCheck`: Si pasa la prueba de sintaxis.
* `hasFunctions`: Si tiene las funciones necesarias.
* `passedFunctionChecks`: Si pasa la pruebas funcionales cada una de las funciones.