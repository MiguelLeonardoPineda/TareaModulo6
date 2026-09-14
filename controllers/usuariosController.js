const usuariosService = require("../services/usuariosService");

// Responde la ruta GET /usuarios
async function listarUsuarios(req, res) {
  try {
    const usuarios = await usuariosService.obtenerUsuarios();

    res.json({
      status: "ok",
      message: "Usuarios obtenidos correctamente",
      data: usuarios
    });
  } catch (error) {
    // Si algo falla, avisamos con codigo 500 y un mensaje claro
    res.status(500).json({
      status: "error",
      message: "Error al obtener los usuarios",
      data: null
    });
  }
}
// Responde la ruta GET /usuarios-orm
async function listarUsuariosORM(req, res) {
  try {
    const usuarios = await usuariosService.obtenerUsuariosORM();

    res.json({
      status: "ok",
      message: "Usuarios obtenidos correctamente con Sequelize",
      data: usuarios
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener los usuarios con el ORM",
      data: null
    });
  }
}

// Responde POST /usuarios
async function crearUsuario(req, res) {
  try {
    const { nombre, email, password } = req.body;

    // Validacion: los tres campos son obligatorios
    if (!nombre || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos: nombre, email y password son obligatorios",
        data: null
      });
    }

    const usuarioNuevo = await usuariosService.crearUsuario(req.body);

    res.status(201).json({
      status: "ok",
      message: "Usuario creado correctamente",
      data: {
        id: usuarioNuevo.id,
        nombre: usuarioNuevo.nombre,
        email: usuarioNuevo.email
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear el usuario: " + error.message,
      data: null
    });
  }
}

// Responde PUT /usuarios/:id
async function actualizarUsuario(req, res) {
  try {
    const id = req.params.id;
    const usuario = await usuariosService.actualizarUsuario(id, req.body);

    // Si el servicio devolvio null, el usuario no existe
    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "No existe un usuario con el id " + id,
        data: null
      });
    }

    res.json({
      status: "ok",
      message: "Usuario actualizado correctamente",
      data: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el usuario: " + error.message,
      data: null
    });
  }
}

// Responde DELETE /usuarios/:id
async function eliminarUsuario(req, res) {
  try {
    const id = req.params.id;
    const usuario = await usuariosService.eliminarUsuario(id);

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "No existe un usuario con el id " + id,
        data: null
      });
    }

    res.json({
      status: "ok",
      message: "Usuario eliminado correctamente",
      data: { id: usuario.id }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar el usuario: " + error.message,
      data: null
    });
  }
}

// Responde GET /usuarios/:id/pedidos
async function obtenerUsuarioConPedidos(req, res) {
  try {
    const id = req.params.id;
    const usuario = await usuariosService.obtenerUsuarioConPedidos(id);

    if (!usuario) {
      return res.status(404).json({
        status: "error",
        message: "No existe un usuario con el id " + id,
        data: null
      });
    }

    res.json({
      status: "ok",
      message: "Usuario y sus pedidos obtenidos correctamente",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener el usuario con sus pedidos: " + error.message,
      data: null
    });
  }
}

// Responde POST /usuarios/registro-completo
async function registrarUsuarioConPedido(req, res) {
  try {
    const { nombre, email, password, producto, cantidad } = req.body;

    // Validacion de campos obligatorios
    if (!nombre || !email || !password || !producto || !cantidad) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos: nombre, email, password, producto y cantidad son obligatorios",
        data: null
      });
    }

    const resultado = await usuariosService.registrarUsuarioConPedido(req.body);

    res.status(201).json({
      status: "ok",
      message: "Usuario y pedido registrados correctamente",
      data: {
        usuario: {
          id: resultado.usuario.id,
          nombre: resultado.usuario.nombre,
          email: resultado.usuario.email
        },
        pedido: {
          id: resultado.pedido.id,
          producto: resultado.pedido.producto,
          cantidad: resultado.pedido.cantidad
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error en la transaccion, no se guardo ningun dato: " + error.message,
      data: null
    });
  }
}

module.exports = {
  listarUsuarios,
  listarUsuariosORM,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioConPedidos,
  registrarUsuarioConPedido
};