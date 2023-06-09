const { Schema, model } = require("mongoose");

const usuarioSchema =  Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
}

const Usuario = model("Usuario", usuarioSchema);

module.exports = Usuario;
