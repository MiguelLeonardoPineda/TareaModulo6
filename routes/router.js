const express = require("express");


const router = express.Router();


const paginasController = require("../controllers/paginasController");


router.get("/", paginasController.mostrarInicio);
router.get("/status", paginasController.mostrarStatus);

// Exportamos el router para usarlo en index.js
module.exports = router;