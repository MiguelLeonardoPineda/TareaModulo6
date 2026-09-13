// Modulo de Node para trabajar con archivos
const fs = require("fs");

// Modulo de Node para armar rutas de carpetas
const path = require("path");

// Ruta completa hasta el archivo log.txt dentro de la carpeta logs
const rutaLog = path.join(__dirname, "..", "logs", "log.txt");

// Middleware que registra cada visita en el archivo log.txt
function registrarVisita(req, res, next) {
  // Tomamos la fecha y hora actual
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString();
  const hora = ahora.toLocaleTimeString();

  // Armamos la linea que vamos a guardar
  const linea = "Fecha: " + fecha + " | Hora: " + hora + " | Ruta: " + req.originalUrl + "\n";

  // Agregamos la linea al final del archivo
  fs.appendFile(rutaLog, linea, function (error) {
    if (error) {
      console.log("No se pudo escribir en el log:", error);
    }
  });

  // Le decimos a express que siga con la ruta
  next();
}

module.exports = registrarVisita;