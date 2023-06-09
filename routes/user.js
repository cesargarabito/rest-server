const { Router } = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const Role = require('../models/role');
const { esRolValido, existeEmail, existeUsuario } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet );
router.post('/', [
    check('nombre', 'El nombre es necesario').not().isEmpty(),
    check('password', 'La contrasena tiene que ser minimo 6 letras, con al menos una letra mayuscula, un digito y un carater especial').isLength({ min: 6}).matches(/[A-Z]/).matches(/\d/).matches(/[!@#$%^&*]/),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
],usuariosPost );
router.put('/:id',[
    check('id', 'El id no existe en la BD').isMongoId(),
    check('id').custom(existeUsuario),
    check('rol').custom(esRolValido),
    validarCampos
],
usuariosPut );
router.delete('/:id',[
    check('id', 'El id no existe en la BD').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos], usuariosDelete );

module.exports = router;