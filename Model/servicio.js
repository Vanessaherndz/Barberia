const mongoose = require("mongoose");

const ServicioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true
    },
    duracion: {
        type: Number   // tiempoen minutos
    },
    estado: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Servicio", ServicioSchema);
