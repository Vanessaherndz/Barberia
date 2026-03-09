const express = require('express')
const router = express.Router()

const reporteController = require('../Controller/reporteController')

router.get('/fecha/:fecha', reporteController.citasPorFecha)

router.get('/completadas', reporteController.citasCompletadas)

router.get('/servicios', reporteController.totalServicios)


module.exports = router;
