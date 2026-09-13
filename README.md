
## Requisitos del sistema

- Node.js
- npm 

## Instalacion

1. Clonar el repositorio:

```
 git clone https://github.com/MiguelLeonardoPineda/TareaModulo6.git
```



## Ejecucion

Modo desarrollo (se reinicia solo al guardar cambios):

```
npm run dev
```

Modo normal:

```
npm start
```

El servidor queda disponible en `http://localhost:3000`.




## Decisiones tecnicas

**Nombre del archivo principal.** Se eligio `index.js` porque es el valor por defecto del
campo `main` en el `package.json` y porque Node lo busca automaticamente al ejecutar una
carpeta. Esto evita configuracion adicional.

**Scripts de ejecucion.** Se mantuvieron los nombres `start` y `dev` sin modificaciones,
porque son la convencion del ecosistema Node: `start` es el script que npm ejecuta por
defecto y `dev` es el nombre habitual para el entorno de desarrollo con recarga automatica.

**Estructura de carpetas.** Se uso la separacion `routes` / `controllers` / `middlewares` /
`public` / `logs`. Las rutas solo declaran que direcciones existen y los controladores
definen que se responde en cada una. Asi se pueden agregar rutas nuevas sin modificar
`index.js`, y el proyecto queda preparado para sumar servicios y conexion a base de datos
en los modulos siguientes.

**Uso de `/public` y no de motor de plantillas.** Se sirve contenido estatico con el
middleware `express.static()`. No se incorporo un motor de plantillas porque en esta etapa
el contenido dinamico se resuelve con `res.send()` y `res.json()` desde los controladores,
y agregarlo seria innecesario para los requisitos del modulo.

**Evento registrado en el log.** Se eligio registrar cada visita a las rutas porque es el
evento que mejor demuestra el funcionamiento continuo del servidor. Se implemento como
middleware y no dentro de cada controlador, para que cualquier ruta nueva quede registrada
automaticamente sin repetir codigo. Cada linea guarda fecha, hora y ruta accedida usando
`fs.appendFile()`.

**Variables de entorno.** El puerto se lee desde un archivo `.env` con `dotenv`, para poder
cambiarlo sin tocar el codigo. El archivo `.env` no se sube al repositorio.

## Tecnologias utilizadas

- Node.js
- Express.js
- dotenv
- vscode 