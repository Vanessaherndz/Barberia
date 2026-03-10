const mongoose = require("mongoose");

const BarberoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especialidad: String,
    foto:String,
    estado: {
        type: Boolean,
        default: true   // activo o inactivo
    }
}, { timestamps: true });

module.exports = mongoose.model("Barbero", BarberoSchema);
