const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer usuario que corresponde al uid

    
    const usuario = await Usuario.findById( uid );
    if(!usuario) {
        return res.status(401).json({
            msg: 'El usuario no esta en la DB'
        })
    }
    req.usuario = usuario;

    //Verificar si el uid tiene estado true
    if(!usuario.estado) {
        return res.status(401).json({
            msg: 'El estado es false'
        })
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = { validarJWT };
