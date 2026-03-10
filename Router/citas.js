const express = require('express');
const router = express.Router();

const citaController = require('../Controller/citaController');

// HTTP Operations

router.post('/crear', citaController.create);

router.get('/cliente/:id', citaController.citasCliente);

router.put('/cancelar/:id', citaController.cancelarCita);

router.put('/estado/:id', citaController.actualizarEstadoCita);//admin

router.get('/todas', citaController.verTodasCitas)//admin

router.get("/barbero/:id/:fecha", citaController.citasBarberoFecha);



module.exports = router;