const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categoria-controller');
const { existeCategoria } = require('../helpers/db-validators');
const { esAdminRole } = require('../middlewares/validar-roles');

const router = Router();

//Obtener todas las categorias
router.get('/', obtenerCategorias)

//Obtener categoria por id

router.get('/:id', [
    check('id', 'El id no existe en la DB').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],
obtenerCategoria);

//Crear una nueva categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar una categoria por id
router.put('/:id', [
    validarJWT,
    check('id', 'El id no existe en la DB').isMongoId(),
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria);

//Delete una categoria por id
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El id no existe en la DB').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],
 borrarCategoria);

module.exports = router;