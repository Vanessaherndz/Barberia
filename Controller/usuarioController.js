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
function registro(req,res){

    const usuario = new Usuario({

        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
        rol: "cliente"

    });

    Usuario.findOne({email:req.body.email})
    .then(usuarioExistente=>{

        if(usuarioExistente){
            return res.json({
                mensaje:"El correo ya está registrado"
            })
        }

        usuario.save()
        .then(usuarioGuardado=>{
            res.json({
                mensaje:"Usuario registrado correctamente",
                usuario:usuarioGuardado
            })
        })

    })
    .catch(error=>res.status(500).json(error))

}


module.exports = { 
    login, 
    registro
};