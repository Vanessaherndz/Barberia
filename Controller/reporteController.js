const Cita = require("../Model/cita"); 

function reporteEstados(req,res){

Cita.aggregate([
{
$group:{
_id:"$estado",
total:{$sum:1}
}
}
])
.then(data=>res.json(data))
.catch(error=>res.status(500).json(error))

}

function barberoTop(req,res){

Cita.aggregate([

{
$group:{
_id:"$barbero",
total:{$sum:1}
}
},

{$sort:{total:-1}},

{$limit:1},

{
$lookup:{
from:"barberos", 
localField:"_id",
foreignField:"_id",
as:"barbero"
}
},

{
$unwind:{
path:"$barbero",
preserveNullAndEmptyArrays:true
}
}

])
.then(data=>res.json(data))
.catch(error=>res.status(500).json(error))

}


function servicioTop(req,res){

Cita.aggregate([

{
$group:{
_id:"$servicio",
total:{$sum:1}
}
},

{$sort:{total:-1}},

{$limit:1},

{
$lookup:{
from:"servicios",
localField:"_id",
foreignField:"_id",
as:"servicio"
}
},

{
$unwind:{
path:"$servicio",
preserveNullAndEmptyArrays:true
}
}

])
.then(data=>res.json(data))
.catch(error=>res.status(500).json(error))

}




function citasPorDia(req,res){

Cita.aggregate([

{
$group:{
_id:{
$dayOfMonth:"$fecha"
},
total:{$sum:1}
}
},

{$sort:{_id:1}}

])
.then(data=>res.json(data))
.catch(error=>res.status(500).json(error))

}

function citasPorMes(req,res){

Cita.aggregate([

{
$group:{
_id:{
$month:"$fecha"
},
total:{$sum:1}
}
},

{$sort:{_id:1}}

])
.then(data=>res.json(data))
.catch(error=>res.status(500).json(error))

}

module.exports= {  
  reporteEstados,
  barberoTop,
  servicioTop,
  citasPorDia,
  citasPorMes
};