const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Debe indicar un nombre']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    }
});
CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();
   
    return data;
  }
module.exports = model('Categoria', CategoriaSchema);