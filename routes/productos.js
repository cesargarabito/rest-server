const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoria-controller');
const { existeCategoria, existeProducto, estadoProducto } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');

const router = Router();

//Obtener todas las categorias
router.get('/', obtenerProductos);

// //Obtener categoria por id

router.get('/:id', [
    check('id', 'El id no existe en la DB').isMongoId(),
    check('id').custom( existeProducto ),
    //check('estado').custom( estadoProducto ), TODO verificar el estado
    validarCampos
],
obtenerProducto);

//Crear una nueva categoria
router.post('/', [
    validarJWT,
    check('categoria', 'El id no existe en la DB').isMongoId(),
    check('categoria', 'La categoria es necesaria').not().isEmpty(),
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    validarCampos
], crearProducto);

// //Actualizar una categoria por id
router.put('/:id', [
    validarJWT,
    check('id', 'El id no existe en la DB').isMongoId(),
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('id').custom( existeProducto ),
    validarCampos
], actualizarProducto);

// //Delete una categoria por id
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no existe en la DB').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],
 borrarProducto);

module.exports = router;