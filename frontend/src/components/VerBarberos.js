import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./barbero.css";

function VerBarberos(){

const [barberos,setBarberos] = useState([]);
const navigate = useNavigate();

useEffect(()=>{

        fetch("http://localhost:4000/barberos")
        .then(res=>res.json())
        .then(data=>{
        setBarberos(data);
        })

},[])


return(

        <div className="barberos-container">

  <button className="btn inicio" onClick={()=>navigate("/cliente")}>
      Ir al Inicio
  </button>

  <h2 className="titulo-barberos">Barberos Disponibles</h2>

  <div className="barberos-grid">

    {barberos.map(barbero => (

      <div key={barbero._id} className="barbero-card">

        <img 
          src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6" 
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
