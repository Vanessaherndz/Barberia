const mongoose = require("mongoose");

const CitaSchema = new mongoose.Schema({

    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },

    barbero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Barbero",
        required: true
    },

    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servicio",
        required: true
    },

    fecha: {
        type: Date,
        required: true
    },

    hora: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        default: "Pendiente" 
        // pendiente. programada, cancelada, completada
    }

}, { timestamps: true });

module.exports = mongoose.model("Cita", CitaSchema);
