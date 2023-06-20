const Categoria = require('../models/categorias-model')


//Obtener categorias paginadas - total - populate
const obtenerCategorias = async (req, res) => {

    const { limite = 4, desde = 0 } = req.query;
    const query = { estado: true};

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query ).populate('usuario', 'nombre')
     .skip(Number(desde))
     .limit(Number(limite))
    ])

    res.json({
        total,
        categorias
    })
}

const obtenerCategoria = async (req, res) => {
    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    if (!categoria.estado) {
        return res.status(401).json({
          msg: "Este producto ha sido eliminado",
        });
      }

    res.json(categoria);
}
const crearCategoria = async (req, res) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(401).json({
            msg: `La categoria ${categoriaDB} ya existe en DB`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    categoria.save();

    res.status(200).json( categoria );
}

//Actualizar categoria
const actualizarCategoria = async ( req, res ) => {
    const { id } = req.params;
    const { estado, usuario, ...resto } = req.body;

    resto.nombre = resto.nombre.toUpperCase();

    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, resto, { new: true });
  res.json( categoriaActualizada );
}

//Remover categoria a estado:false

const borrarCategoria = async ( req, res ) => {
    const { id } = req.params;
    //const { _id, ...resto } = req.body;

    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, { new: true });
  res.json( categoriaBorrada );
}


module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}