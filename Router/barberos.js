const express = require('express');
const router = express.Router();

const barberoController = require('../Controller/barberoController');

// HTTP Operations

router.get('/', barberoController.show);

router.post('/crear', barberoController.create);

router.post('/editar', barberoController.update);

router.get('/borrar/:id', barberoController.deleted);

module.exports = router;
