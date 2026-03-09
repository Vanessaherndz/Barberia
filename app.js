const express = require('express');
const app = express();

// CONEXIÓN con Mongo
require('./database');

// Configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Rutas
const barberoRoutes = require('./Router/barberos');
const servicioRoutes = require('./Router/servicios');
const citaRoutes = require('./Router/citas');
const usuarioRoutes = require('./Router/usuarios');
const reporteRouter = require('./Router/reportes');

app.use('/reportes', reporteRouter);
app.use('/usuarios', usuarioRoutes);
app.use('/barberos', barberoRoutes);
app.use('/servicios', servicioRoutes);
app.use('/citas', citaRoutes);


app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});
