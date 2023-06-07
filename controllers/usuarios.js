const { response, request } = require("express");
const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: "get World-controller",
    body,
  });
};
const usuariosPost = async (req = request, res = response) => {
  const body = req.body;
  const usuario = new Usuario({ body });
  //Guardar en DB
  await usuario.save();
  res.json({
    msg: "os meus",
    usuario,
  });
};
const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "put World-controller",
    id
  });
};
const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete World-controller",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
