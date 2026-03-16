import React, { useEffect, useState } from "react";
import "./barbero.css";
import BotonInicio from "./volvercliente";

function VerBarberos(){

const [barberos,setBarberos] = useState([]);

useEffect(()=>{

        fetch("http://localhost:4000/barberos")
        .then(res=>res.json())
        .then(data=>{
        setBarberos(data);
        })

},[])


return(

        <div className="barberos-container">

  <BotonInicio/>

  <h2 className="titulo-barberos">Barberos Disponibles</h2>

  <div className="barberos-grid">

    {barberos.map(barbero => (

      <div key={barbero._id} className="barbero-card">

        <img 
          src={barbero.foto}
          alt={barbero.nombre}
          className="barbero-img"
        />

        <h3>{barbero.nombre}</h3>

        <p className="especialidad">{barbero.especialidad}</p>

        <p className="estado">{barbero.estado}</p>

      </div>

    ))}

  </div>

</div>

)

}

export default VerBarberos;
