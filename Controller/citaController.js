const Cita = require('../Model/cita');

function create(req,res){

    if(!req.body.barbero || !req.body.servicio || !req.body.fecha || !req.body.hora){
        return res.status(400).json({
        mensaje:"Faltan datos para crear la cita"
        })
    }

    Cita.findOne({
        barbero:req.body.barbero,
        fecha:req.body.fecha,
        hora:req.body.hora,
        estado:{ $ne:"cancelada"}
    })

    .then(citaExistente=>{

    if(citaExistente){
        return res.status(400).json({
        mensaje:"Este barbero ya tiene una cita en esa fecha y hora"
        })
    }

    const cita = new Cita({
    cliente:req.body.cliente,
    barbero:req.body.barbero,
    servicio:req.body.servicio,
    fecha:req.body.fecha,
    hora:req.body.hora,
    estado:"pendiente"
    })

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
function cancelarCita(req, res){

const id = req.params.id;

Cita.findById(id)

    .then(cita=>{

if(!cita){
    return res.status(404).json({
    mensaje:"Cita no encontrada"
    })
}

if(cita.estado === "completada"){
    return res.json({
    mensaje:"No se puede cancelar una cita completada"
    })
}

    cita.estado = "cancelada";

    cita.save()

        .then(citaActualizada=>{
        res.json({
        mensaje:"Cita cancelada correctamente",
        cita:citaActualizada
        })
    })

    })

    .catch(error=>res.status(500).json({error:error}))

}



//para el admin
function actualizarEstadoCita(req, res){

    const id = req.params.id
    const estado = req.body.estado

    const estadosValidos = ["confirmada", "completada", "cancelada"];

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
    .populate('cliente', 'nombre usuario')
    .populate('barbero','nombre')
    .populate('servicio','nombre precio')

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
        fecha: fecha,
        estado: { $ne: "cancelada" }
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
