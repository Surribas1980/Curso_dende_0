# Antes de comenzar

> Para poder inicialo servidor, mais poder realizar dunha maneira axeitada o exercicio da aplicación, deberemos ter instalados varios paquetes, entre eles:
>
>  - express
>  - cors
>  - body-parser

Neste sentido, deberemos instalalos dende a consola.

## Instalando paquetes de npm

NPM é un xestor de paquetes creado en javascript, en NODE ven instalado por defecto, as súas siglas significan Node Package Manager (Manexador de paquetes de Node).

O uso principal de NPM é descargar paquetes.

> ### Qué é un paquete

```
É un pedazo de código que pode ser copiado e instalado
```
Veñen na carpeta chamada "node_modules". Nesta plataforma non aparecen pero están, é dicir, a carpeta está oculta.

No caso de instalar Node nun IDE, esta aparecerá o instalar algún.
> ### Instalación de Express

A instalación de Express, realizarémola escribindo o seguinte comando:

```
npm i express
```

> ### Instalación doutros paquetes

A instalación dos outros paquetes asociados, farémolo da seguinte maneira:

```
npm i -D <nome de paquete>
```

nos instalaremos: __cors__ e __body-parser__

> ### O arquivo: 'package.json'

Antes de instalar nada, se observásemos o arquivo, visualizaríamos o seguinte:

```json
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^18.0.6",
    "node-fetch": "^3.2.6"
  }
}
```

Despois da instalación dos paquetes, visualizaremos o arquivo ***package.json*** comprobando que estes foron instalados.

Neste caso, dádevos conta que se modificou con varios elementos, un denominado "devDependencies", onde se observa que foi instalado o _body-parser_ e mais _cors_, e o outro co elemento denominado "dependencies" onde está instalado _express_.


```json
{
  "name": "nodejs",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/node": "^18.0.6",
    "express": "^4.18.2",
    "node-fetch": "^3.2.6"
  },
  "devDependencies": {
    "body-parser": "^1.20.2",
    "cors": "^2.8.5"
  }
}
```

## Os programas

> Para poder realizalas aplicacións, estas deberán conter coma mínimo, varios arquivos.
>
> Entre eles un que se vai chamar __server.js__ co seguinte código (dada a instalacións destes paquetes)

```javascript
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));//parsea solo string
app.use(cors())

// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "static")));

//START SERVER
app.listen(3000, function () {
 console.log("Server running");
});

```

> ### A carpeta 'static' e o arquivo 'index.html'

Deberemos crear unha carpeta chamada __static__ e sobre a mesma crearemos un arquivo chamado __index.html__, de tal xeito que visualizaremos o seguinte:

![image](./Imaxes/image.png)

#### O arquivo 'index.html'

Vamos crear o seguinte contido:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>O meu título</title>
  </head>

  <body>
    Hola mundo
  </body>
</html>
```

## Lanzando a aplicación

Unha vez creado todo o anterior, deberemos escribir sobre o shell o seguinte:

```
node server
```
ou 

```
node server.js
```
O primeiro paso sería escribir sobre a línea de comandos: 


![image](./Imaxes/image_2.png)

Unha vez escrito, executamos, visualizando o seguinte:


![image](./Imaxes/image_3.png)

E comprobaremos efectivamente que sae :

![Captura de pantalla 2023-07-05 104448](./Imaxes/saidanaweb.png)
