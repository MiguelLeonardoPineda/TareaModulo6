// Paquete que permite conectar Node con Oracle
const oracledb = require("oracledb");

// Hace que los resultados lleguen como objetos ({id: 1, nombre: "Ana"})
// en vez de arreglos ([1, "Ana"]), que es mas facil de leer
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

// Datos de conexion tomados del archivo .env
const datosConexion = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION
};

// Abre una conexion nueva con la base de datos
async function conectar() {
  const conexion = await oracledb.getConnection(datosConexion);
  return conexion;
}

// Prueba la conexion al iniciar el servidor y avisa por consola
async function probarConexion() {
  try {
    const conexion = await conectar();
    console.log("Conexion exitosa con la base de datos Oracle");
    await conexion.close();
  } catch (error) {
    console.log("Error al conectar con la base de datos:", error.message);
  }
}

module.exports = {
  conectar,
  probarConexion
};