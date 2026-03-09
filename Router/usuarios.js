const express = require('express');
const router = express.Router();

const usuarioController = require('../Controller/usuarioController');

router.post('/login', usuarioController.login);

router.post('/', usuarioController.registrar); 

module.exports = router;
