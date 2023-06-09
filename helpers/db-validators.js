const Role = require('../models/role')
const Usuario = require('../models/usuario')
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if(!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
};

const existeEmail = async (correo = '') => {
    const existeEmailDB = await Usuario.findOne({correo});
  if(existeEmailDB){
   throw new Error(`El correo ${correo} ya existe`);
  }
}

const existeUsuario = async (id) => {
    const existeUsuarioDB = await Usuario.findById(id);
  if(!existeUsuarioDB){
   throw new Error(`El id: ${id} no existe`);
  }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuario
}