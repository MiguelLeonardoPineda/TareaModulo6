// Cargamos las variables del archivo .env
require("dotenv").config();

// Importamos express
const express = require("express");

// Modulo de Node para armar rutas de carpetas
const path = require("path");

// Importamos el archivo de rutas
const router = require("./routes/router");

// Importamos el middleware que registra las visitas
const registrarVisita = require("./middlewares/logger");

// Importamos las funciones de conexion a la base de datos
const { probarConexion } = require("./config/database");

// Creamos la aplicacion
const app = express();

// Leemos el puerto desde el .env, si no existe usamos el 3000
const puerto = process.env.PORT || 3000;

// Middleware que permite leer datos en formato JSON del body
app.use(express.json());

// Middleware que sirve los archivos de la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Middleware que registra cada visita en logs/log.txt
app.use(registrarVisita);

// Conectamos todas las rutas del router a la aplicacion
app.use("/", router);

// Ponemos el servidor a escuchar
app.listen(puerto, () => {
  console.log("Servidor iniciado en http://localhost:" + puerto);
  // Probamos la conexion con la base de datos
  probarConexion();
});