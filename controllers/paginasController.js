// Controlador de la ruta principal: devuelve una respuesta en HTML
function mostrarInicio(req, res) {
  res.send("<h1>Bienvenido a la aplicacion</h1><p>Proyecto Node y Express - Modulo 6</p>");
}

// Controlador de la ruta /status: devuelve una respuesta en JSON
function mostrarStatus(req, res) {
  res.json({
    status: "ok",
    message: "El servidor esta funcionando",
    data: {
      fecha: new Date().toLocaleString()
    }
  });
}

// Exportamos las dos funciones para poder usarlas en las rutas
module.exports = {
  mostrarInicio,
  mostrarStatus
};