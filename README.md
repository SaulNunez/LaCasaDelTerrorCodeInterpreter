# Microservicio de procesamiento de código

Para el juego necesitabamos una forma de procesar el codigo que crea el jugador con el editor de bloques. 

Aunque puedes crear código del entorno de programación a varios lenguajes, se prefirio Javascript por su capacidad inherente de ser interpretado a base de código mandado por red.

Por seguridad corre en un interprete, es una librería externa que mediante su API podemos crear algunas funciones mock para poder escuchar sus resultados fuera de la "máquina virtual".

Algunas de las funciones de este procesamiento de código son las siguientes
* Obtener salida estandar del programa