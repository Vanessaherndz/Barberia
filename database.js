const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/Barberia';

mongoose.connect(url);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error al conectar MongoDB'));
db.once('open', function () {
    console.log('Se ha conectado a la base de datos');
});

module.exports = db;
