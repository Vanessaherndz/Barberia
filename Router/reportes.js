const express = require('express');
const router = express.Router();

const reporteController = require('../Controller/reporteController');

router.get("/estados", reporteController.reporteEstados);

router.get("/barbero-top", reporteController.barberoTop);

router.get("/servicio-top", reporteController.servicioTop);

router.get("/citas-dia",  reporteController.citasPorDia);

router.get("/citas-mes",  reporteController.citasPorMes);

module.exports = router;
