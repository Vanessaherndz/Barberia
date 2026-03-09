const Cita = require('../Model/cita')

function citasPorFecha(req,res){

    const fecha = req.params.fecha

    Cita.find({fecha:fecha})
    .populate('barbero')
    .populate('servicio')
    .then(citas=>{
        res.json(citas)
    })
    .catch(error=>res.status(500).json({error:error}))
}

function citasCompletadas(req,res){

    Cita.find({estado:"completada"})
    .populate('barbero')
    .populate('servicio')
    .then(citas=>{
        res.json(citas)
    })
    .catch(error=>res.status(500).json({error:error}))
}

function totalServicios(req,res){

    Cita.aggregate([
        { $match: { estado: "completada" } },
        {
            $group:{
                _id:"$servicio",
                total:{$sum:1}
            }
        }
    ])
    .then(resultado=>{
        res.json(resultado)
    })
    .catch(error=>res.status(500).json({error:error}))
}

module.exports = {
    citasPorFecha,
    citasCompletadas,
    totalServicios
}
