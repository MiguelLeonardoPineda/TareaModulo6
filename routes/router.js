const express = require("express");

// Creamos un router, que es como un mini-servidor solo para rutas
const router = express.Router();

// Importamos los controladores
const paginasController = require("../controllers/paginasController");
const usuariosController = require("../controllers/usuariosController");

// Rutas de paginas
router.get("/", paginasController.mostrarInicio);
router.get("/status", paginasController.mostrarStatus);

// Rutas de usuarios
router.get("/usuarios", usuariosController.listarUsuarios);

router.get("/usuarios-orm", usuariosController.listarUsuariosORM);

router.post("/usuarios", usuariosController.crearUsuario);
router.put("/usuarios/:id", usuariosController.actualizarUsuario);
router.delete("/usuarios/:id", usuariosController.eliminarUsuario);
router.get("/usuarios/:id/pedidos", usuariosController.obtenerUsuarioConPedidos);
router.post("/usuarios/registro-completo", usuariosController.registrarUsuarioConPedido);

// Exportamos el router para usarlo en index.js
module.exports = router;