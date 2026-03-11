import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MisCitas(){

const [citas,setCitas] = useState([]);

const navigate = useNavigate();
const cliente = localStorage.getItem("usuarioId");

useEffect(()=>{

fetch(`http://localhost:4000/citas/cliente/${cliente}`)
.then(res=>res.json())
.then(data=>{
setCitas(data);
})

},[cliente])


const cancelarCita = async (id) =>{

const respuesta = await fetch(`http://localhost:4000/citas/cancelar/${id}`,{

method:"PUT"

})

const data = await respuesta.json();

alert(data.mensaje);

window.location.reload();

}


return(

<div style={{padding:"40px"}}>

    <button className="btn inicio" onClick={()=>navigate("/cliente")}>
        Ir al Inicio
        </button>

<h2>Mis Citas</h2>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>Barbero</th>
<th>Servicio</th>
<th>Fecha</th>
<th>Hora</th>
<th>Estado</th>
<th>Acción</th>
</tr>

</thead>

<tbody>

{citas.map(cita=>(

<tr key={cita._id}>

<td>{cita.barbero?.nombre}</td>
<td>{cita.servicio?.nombre}</td>
<td>{new Date(cita.fecha).toLocaleDateString()}</td>
<td>{cita.hora}</td>
<td>{cita.estado}</td>

<td>

{cita.estado !== "cancelada" && cita.estado !== "completada" && (

<button onClick={()=>cancelarCita(cita._id)}>
Cancelar
</button>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default MisCitas;
