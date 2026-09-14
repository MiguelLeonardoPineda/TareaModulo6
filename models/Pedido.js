const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

// Modelo que representa la tabla PEDIDOS
const Pedido = sequelize.define("Pedido", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "ID"
  },
  producto: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: "PRODUCTO"
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "CANTIDAD"
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "USUARIO_ID"
  }
}, {
  tableName: "PEDIDOS",
  timestamps: false
});

module.exports = Pedido;