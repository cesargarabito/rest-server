const { Producto } = require("../models");

//Obtener categorias paginadas - total - populate
const obtenerProductos = async (req, res) => {
  const { limite = 4, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "nombre");

  if (!producto.estado) {
    return res.status(401).json({
      msg: "Este producto ha sido eliminado",
    });
  }

  res.json(producto);
};
const crearProducto = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoria = req.body.categoria;

  const productoDB = await Producto.findOne({ nombre });

  if (productoDB) {
    return res.status(401).json({
      msg: `El producto ${productoDB.nombre} ya existe en DB`,
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
    categoria: categoria,
  };

  const producto = new Producto(data);
  producto.save();

  res.status(200).json(producto);
};

//Actualizar categoria
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { estado, usuario, categoria, ...resto } = req.body;

  resto.nombre = resto.nombre.toUpperCase();

  const productoActualizado = await Producto.findByIdAndUpdate(id, resto, {
    new: true,
  });
  res.json(productoActualizado);
};

//Remover categoria a estado:false

const borrarProducto = async (req, res) => {
  const { id } = req.params;

  const productoBorrado = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json(productoBorrado);
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto,
};
