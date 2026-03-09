const express = require('express');
const router = express.Router();

const servicioController = require('../Controller/servicioController');

// HTTP Operations

router.get('/', servicioController.show);

router.post('/crear', servicioController.create);

router.post('/editar', servicioController.update);

router.get('/borrar/:id', servicioController.deleted);

module.exports = router;