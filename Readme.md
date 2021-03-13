# EJERCICIO
La empresa ACME ofrece a sus empleados la flexibilidad de trabajar las horas que deseen. Pagarán las horas trabajadas según el día de la semana y la hora del día.

### Javascript - NodeJS

# Para iniciar
Primero instalar las dependencias para el testing usando:
```npm install```

# Ejecutar
Para ejecutar el aplicativo se debe usar un servidor apache (XAMP, LAMP, WAMP etc).
Ubicar la carpeta ACME PROBLEM en cualquiera de esos servidores, luego dirigirse al navegador y escribit la url:
```http://localhost/ACME-Problem/```

# Testing
```npm t```

# Datos
Para este ejercicio se usaron datos almacenados en un archivo.txt con el siguiente formato:
RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00.

# Arquitectura

Para la solución de este problema se procedió a usar Programación Orientada a Objetos en Javascript, creando la clase ``Employe`` que contiene todas las funciones que resuelven el ejercicio. También se usó Jest para hacer testing y verificar el funcionamiento de la aplicación.

```
ACME-Problem
│   employes.txt
│   index.html
│   package-lock.json
│   package.json
│   Readme.md
│
├───CSS
│       app.css
│
├───JS
│   │   app.js
│   │   conditions.js
│   │
│   └───Class
│           Employe.js
│
└───__tests__
        appTest.js
```


# Solución
1. Obtener el archivo.txt a travez de un input
2. Leer el archivo usando FileReader y generar un array de cada empleado, con el siguiente formato:
    ```0: "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00"```
3. Usando la siguiente expresión regular ``/([[a-z]+|[^a-z]+]|[^=,:-]+)/gi`` procedemos a extraer cada elemento del array, quedando así: ``['RENE','MO','10','00','12','00','TU','10','00','12','00','TH','01','00','03','00',...]``, lo que nos permitirá resolver de manera más facil el enunciado.

4. Ahora creamos un archivo llamado ``conditions.js`` donde pondremos la información de la tabla que se nos presenta al iniciar el proble, ya que en base a esas condiciones se pagará.

5. Tomamos cada bloque del array(a excepción del nombre) y los comparamos con las condiciones que se plantean al inicio del problema, de esta manera podemos determinar cuanto se debe pagar por los días laborados.

6. Hacemos las comparaciones entre la hora de inicio,minuto de inicio y la del final se encuentran ubicados dentro del rango de condiciones establecidas, si no es así; se procede con la siguiente condicón. Cuando se encuentre una coincidenca, se procede a calcular el tiempo en horas entre las 2 horas del día.

```
    if (startMinute > endMinute) {
      endHour--;
      endMinute += 60;
    }
    return (endHour - startHour + (endMinute - startMinute) / 60).toFixed(2);
```
Procedemos a calcular el monto por día multiplicando el número de horas por el valor de c/hora establecido en las condiciones.

```
    for (let i = 0; i < infoEmploye.length; i += 5) {
      if (CONDITIONS.WEEKDAY.includes(infoEmploye[i])) {
        valueDate = CONDITIONS.TIME_WEEKDAY;
      } else {
        valueDate = CONDITIONS.TIME_WEEKEND;
      }
      total += this.PaymentPerDay(
        infoEmploye[i + 1],
        infoEmploye[i + 2],
        infoEmploye[i + 3],
        infoEmploye[i + 4],
        valueDate
      );
    }
    return total.toFixed(2);
```

De esta manera se ha resuelto este ejercicio.

