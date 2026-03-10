const Cita = require('../Model/cita');

function create(req,res){

    const cita = new Cita({
        cliente: req.body.cliente,
        barbero: req.body.barbero,
        servicio: req.body.servicio,
        fecha: req.body.fecha,
        hora: req.body.hora,
        estado: "Pendiente"
    })

    // si ya existe cita
    Cita.findOne({
        barbero: req.body.barbero,
        fecha: req.body.fecha,
        hora: req.body.hora
    })
    .then(citaExistente => {

        if(citaExistente){
            return res.status(400).json({
                mensaje: "Este barbero ya tiene una cita en esa fecha y hora"
            })
        }

        cita.save()
        .then(citaGuardada=>{
            res.json({
                mensaje:"Cita creada correctamente",
                cita:citaGuardada
            })
        })

    })
    .catch(error=>res.status(500).json({error:error}))
}


function citasCliente(req,res){

    const id = req.params.id

    Cita.find({cliente:id})
    .populate('cliente','usuario')
    .populate('barbero','nombre')
    .populate('servicio','nombre precio')
    .then(citas=>{
        res.json(citas)
    })
    .catch(error=>{
        res.status(500).json(error)
    })
}


//cancela la cita del lado del cliente(cambia el estado a caneclado)
function cancelarCita(req, res) {

    const id = req.params.id;

    Cita.findByIdAndUpdate(
        id,
        { estado: "cancelada" },
        { new: true }
    )
    .then(cita => {
        if(!cita){
            return res.status(404).json({ mensaje: "Cita no encontrada" });
        }
        if(cita.estado === "completada"){//para que el cliente no pueda cancelar una cita ya completada
        return res.json({mensaje:"No se puede cancelar una cita completada"});
        }
        res.json({
            mensaje: "Cita cancelada correctamente",
            cita: cita
        });
    })
    .catch(err => res.status(500).json({ error: err }));
}
//para el admin
function actualizarEstadoCita(req, res){

    const id = req.params.id
    const estado = req.body.estado

    const estadosValidos = ["confirmada", "completada"]

    if(!estadosValidos.includes(estado)){
        return res.status(400).json({
            mensaje: "Estado no válido"
        })
    }

    Cita.findByIdAndUpdate(
        id,
        {estado: estado},
        {new:true}
    )
    .then(cita => {

        if(!cita){
            return res.status(404).json({
                mensaje:"Cita no encontrada"
            })
        }

        res.json({
            mensaje:"Estado de cita actualizado",
            cita:cita
        })

    })
    .catch(error => res.status(500).json({error:error}))
}
//del lado del admin
function verTodasCitas(req,res){

    Cita.find()
    .populate('barbero')
    .populate('servicio')
    .then(citas=>{
        res.json(citas)
    })
    .catch(error=>res.status(500).json({error:error}))
}

function citasBarberoFecha(req,res){

    const barbero = req.params.id;
    const fecha = req.params.fecha;

    Cita.find({
        barbero: barbero,
        fecha: fecha
    })
    .then(citas=>{
        res.json(citas);
    })
    .catch(error=>{
        res.status(500).json(error);
    });

}


module.exports = {
    create,
    citasCliente,
    cancelarCita,
    actualizarEstadoCita,
    verTodasCitas,
    citasBarberoFecha
};
