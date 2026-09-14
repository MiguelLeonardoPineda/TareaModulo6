
const { conectar } = require("../config/database");
const Usuario = require("../models/Usuario");
const { Pedido } = require("../models");
const sequelize = require("../config/sequelize");


async function obtenerUsuarios() {
  let conexion;
  try {
    conexion = await conectar();

    
    const resultado = await conexion.execute(
      "SELECT id, nombre, email FROM usuarios ORDER BY id"
    );

    
    return resultado.rows;
  } finally {
    
    if (conexion) {
      await conexion.close();
    }
  }
}
// Trae todos los usuarios usando el ORM Sequelize
async function obtenerUsuariosORM() {
  // attributes indica que columnas pedir, dejando password fuera
  const usuarios = await Usuario.findAll({
    attributes: ["id", "nombre", "email"],
    order: [["id", "ASC"]]
  });

  return usuarios;
}


// Crea un usuario nuevo
async function crearUsuario(datos) {
  const usuarioNuevo = await Usuario.create({
    nombre: datos.nombre,
    email: datos.email,
    password: datos.password
  });

  return usuarioNuevo;
}

// Modifica un usuario existente
async function actualizarUsuario(id, datos) {
  // Primero buscamos si el usuario existe
  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return null;
  }

  // Solo actualizamos los campos que llegaron
  if (datos.nombre) {
    usuario.nombre = datos.nombre;
  }
  if (datos.email) {
    usuario.email = datos.email;
  }

  await usuario.save();
  return usuario;
}

// Elimina un usuario existente
async function eliminarUsuario(id) {
  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return null;
  }

  await usuario.destroy();
  return usuario;
}

// Trae un usuario con todos sus pedidos en una sola consulta
async function obtenerUsuarioConPedidos(id) {
  const usuario = await Usuario.findByPk(id, {
    attributes: ["id", "nombre", "email"],
    include: [
      {
        model: Pedido,
        as: "pedidos",
        attributes: ["id", "producto", "cantidad"]
      }
    ]
  });

  return usuario;
}

// Registra un usuario y su primer pedido dentro de una transaccion.
// Si alguna de las dos operaciones falla, se deshacen ambas.
async function registrarUsuarioConPedido(datos) {
  // Abrimos la transaccion
  const transaccion = await sequelize.transaction();

  try {
    // Accion 1: crear el usuario
    const usuarioNuevo = await Usuario.create({
      nombre: datos.nombre,
      email: datos.email,
      password: datos.password
    }, { transaction: transaccion });

    // Accion 2: crear su primer pedido
    const pedidoNuevo = await Pedido.create({
      producto: datos.producto,
      cantidad: datos.cantidad,
      usuarioId: usuarioNuevo.id
    }, { transaction: transaccion });

    // Si llegamos aqui, las dos acciones salieron bien: confirmamos
    await transaccion.commit();
    console.log("Transaccion exitosa: usuario y pedido creados");

    return { usuario: usuarioNuevo, pedido: pedidoNuevo };

  } catch (error) {
    // Si algo fallo, deshacemos todo
    await transaccion.rollback();
    console.log("Transaccion fallida, se deshizo todo:", error.message);

    // Relanzamos el error para que el controlador lo maneje
    throw error;
  }
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuariosORM,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioConPedidos,
  registrarUsuarioConPedido
};