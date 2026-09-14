const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

// Modelo que representa la tabla USUARIOS
// Oracle guarda los nombres en mayusculas, por eso usamos "field"
// para indicar el nombre real de cada columna en la base de datos
const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "ID"
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: "NOMBRE"
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    field: "EMAIL"
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: "PASSWORD"
  }
}, {
  tableName: "USUARIOS",  // nombre real de la tabla en Oracle
  timestamps: false       // no queremos columnas de fecha automaticas
});

module.exports = Usuario;