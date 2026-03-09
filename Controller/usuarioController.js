const Usuario = require("../Model/usuario");

// Definimos las funciones
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        if (usuario.password !== password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        // Diferenciar por rol
        if (usuario.rol === "admin") {
            return res.json({ mensaje: "Bienvenido Administrador", rol: "admin", usuario });
        } else {
            return res.json({ mensaje: "Bienvenido Cliente", rol: "cliente", usuario });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//guarda el usuario
const registrar = async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Exportamos todas las funciones al final (formato consistente)
module.exports = { 
    login, 
    registrar
};