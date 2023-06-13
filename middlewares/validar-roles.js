const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "El usuario no esta definido",
    });
  }

  const { nombre, rol } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no esta autorizado a realizar esta accion`,
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "El usuario no esta definido",
      });
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `El servicio requiere uno  de estos roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = { esAdminRole, tieneRol };
