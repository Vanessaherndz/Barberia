const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    password: String,
    rol: {
        type: String,
        default: "cliente" // cliente o admin
    }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
