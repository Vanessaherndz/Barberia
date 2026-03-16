import React, { useEffect, useState } from "react";

import "./miscitas.css";
import BotonInicio from "./volvercliente";

function MisCitas(){

const [citas,setCitas] = useState([]);


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

<div className="citas-container">

  <BotonInicio/>

  <h2 className="titulo-citas">Mis Citas</h2>

  <div className="tabla-container">

  <table className="tabla-citas">

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

      {citas.map(cita => (

        <tr key={cita._id}>

          <td>{cita.barbero?.nombre}</td>
          <td>{cita.servicio?.nombre}</td>
          <td>{new Date(cita.fecha).toLocaleDateString()}</td>
          <td>{cita.hora}</td>

          <td className={`estado ${cita.estado}`}>
            {cita.estado}
          </td>

          <td>

            {cita.estado !== "cancelada" && cita.estado !== "completada" && (

              <button 
                className="btn-cancelar"
                onClick={()=>cancelarCita(cita._id)}
              >
                Cancelar
              </button>

            )}

          </td>

        </tr>

      ))}

    </tbody>

  </table>

  </div>

</div>

)

}

export default MisCitas;
