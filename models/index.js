const Usuario = require("./Usuario");
const Pedido = require("./Pedido");

// Relacion 1:N -> un usuario tiene muchos pedidos
Usuario.hasMany(Pedido, {
  foreignKey: "usuarioId",
  as: "pedidos"
});

// Relacion inversa -> cada pedido pertenece a un usuario
Pedido.belongsTo(Usuario, {
  foreignKey: "usuarioId",
  as: "usuario"
});

module.exports = {
  Usuario,
  Pedido
};