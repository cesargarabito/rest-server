const Role = require("../models/role");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categorias-model");
const { Producto } = require("../models");

const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const existeEmailDB = await Usuario.findOne({ correo });
  if (existeEmailDB) {
    throw new Error(`El correo ${correo} ya existe`);
  }
};

const existeUsuario = async (id) => {
  const existeUsuarioDB = await Usuario.findById(id);
  if (!existeUsuarioDB) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const existeCategoria = async (id) => {
  const existeCategoriaDB = await Categoria.findById(id);
  if (!existeCategoriaDB) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const existeProducto = async (id) => {
  const existeProductoDB = await Producto.findById(id);
  if (!existeProductoDB) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const estadoProducto = async (estado = Boolean) => {
  const existeEstadoDB = await Usuario.findOne({ estado });
  if (existeEstadoDB) {
    throw new Error(`El correo ${estado} ya existe`);
  }
};

//Validar colecciones
const coleccionesPermitidas = (coleccion, colecciones) => {
  const incluida = colecciones.includes( coleccion);
  if(!incluida) {
    throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
  }
  return true;
}

module.exports = {
  esRolValido,
  existeEmail,
  existeUsuario,
  existeCategoria,
  existeProducto,
  estadoProducto,
  coleccionesPermitidas
};
