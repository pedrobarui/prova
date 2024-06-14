const express = require('express');
const router = express.Router();

// Controller
const AutenticacaoController = require('../controllers/AutenticacaoController');

// Validators
const { validarNovoUsuario, validarLoginUsuario } = require('../validators/AutenticacaoValidator');

// Rotas
router.post('/auth/registrar', validarNovoUsuario, AutenticacaoController.registrar);

router.post('/auth/login', validarLoginUsuario, AutenticacaoController.login);

module.exports = router;
