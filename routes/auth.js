const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es necesario').isEmail(),
    check('password', 'La contranesa no es valida').not().isEmpty(),
    validarCampos
],login)


module.exports = router;