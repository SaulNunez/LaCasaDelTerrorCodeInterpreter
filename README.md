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
    "checkType": "check_for_branching"
}
```

* `code`: Contiene el código a probar.   
* `expectedOutput`: Es la salida a comparar. Si la salida tiene varias lineas, se necesita concatenarlas un espacio para poderlas comparar. Ej. una salida en cada linea de \["0", "1", "2"\] se compararía con "0 1 2".  
* `checkType`: Es el tipo de prueba a realizar en código de estructura. Acepta los siguiente valores: 
    * `check_for_branching`
    * `check_for_loops`
    * `check_for_functions`

Salida esperada

```json
{
  "runOutput": [
    "Hola mundo"
  ],
  "matchesOutput": true,
  "passedCheck": false
}
```
* `runOutput`: La salida linea por linea de ejecutar el programa.
* `matchesOutput`: Resultado de la comparación de la salida con lo esperado.
* `passedCheck`: Si pasa la prueba de sintaxis.