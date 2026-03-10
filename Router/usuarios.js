const express = require('express');
const router = express.Router();

const usuarioController = require('../Controller/usuarioController');

router.post('/login', usuarioController.login);

router.post("/registro", usuarioController.registro);

module.exports = router;
