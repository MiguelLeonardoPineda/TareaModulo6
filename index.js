
require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./routes/router");
const registrarVisita = require("./middlewares/logger");

// Creamos la aplicacion
const app = express();
const puerto = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(registrarVisita);
app.use("/", router);

app.listen(puerto, () => {
  console.log("Servidor iniciado en http://localhost:" + puerto);
});