const { isValidObjectId } = require("mongoose");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require("mongoose").Types;

const coleccionesPermitidas = ["usuarios", "categorias", "productos", "roles"];

const buscarUsuarios = async (termino, res) => {
  const isMongoId = ObjectId.isValid(termino); //Boolean

  if (isMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i");
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

const buscarCategorias = async (termino, res) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const categoria = await Categoria.findById(termino).populate(
      "usuario",
      "nombre"
    );
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({
    nombre: regex,
    estado: true,
  }).populate("usuario", "nombre");

  res.json({
    results: categorias,
  });
};

const buscarProductos = async (termino, res) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const producto = await Producto.findById(termino)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre");
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({ nombre: regex, estado: true })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  res.json({
    results: productos,
  });
};

const buscar = (req, res) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.status(400).json({
      msg: `La coleccion que ha introducido no esta permitida en la lista: ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;

    case "categorias":
      buscarCategorias(termino, res);
      break;

    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se le olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
