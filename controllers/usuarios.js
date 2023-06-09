const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find().skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req = request, res = response) => {
  const { nombre, rol, correo, password } = req.body;
  const usuario = new Usuario({ nombre, rol, correo, password });
  //Verificar si el correo existe

  //Encriptar la contrasena
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  //Guardar en DB
  await usuario.save();
  res.json({
    msg: "os meus",
    usuario,
  });
};
const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params.id;
  const { _id, correo, google, password, ...resto } = req.body;

  //TODO validar contra la base de datos
  if (password) {
    //Encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findOneAndUpdate(id, resto, { new: true });
  res.json(usuario);
};
const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
