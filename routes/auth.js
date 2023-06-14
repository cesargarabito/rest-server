const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es necesario').isEmail(),
    check('password', 'La contranesa no es valida').not().isEmpty(),
    validarCampos
],login)

router.post('/google', [
    check('id_token', 'El id_token de Google es necesario').not().isEmpty(),
    validarCampos
],googleSignIn)


module.exports = router;