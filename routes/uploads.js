const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const router = Router();

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de Mongo').isMongoId(),
    check('coleccion').custom( c=> coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen)

module.exports = router;