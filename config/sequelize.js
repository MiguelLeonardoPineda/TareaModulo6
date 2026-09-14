const { Sequelize } = require("sequelize");

// Conexion de Sequelize usando las mismas credenciales del .env
const sequelize = new Sequelize({
  dialect: "oracle",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialectOptions: {
    connectString: process.env.DB_CONNECTION
  },
  logging: false // evita que imprima cada consulta SQL en la consola
});

module.exports = sequelize;