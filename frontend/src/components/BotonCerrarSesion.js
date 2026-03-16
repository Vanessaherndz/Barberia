import React from "react";
import { useNavigate } from "react-router-dom";

function BotonCerrarSesion(){

const navigate = useNavigate();

const cerrarSesion = () => {

localStorage.removeItem("usuarioId");
localStorage.removeItem("usuarioNombre");
localStorage.removeItem("usuarioRol");

navigate("/");

}

return(

<button className="btn btn-salir" onClick={cerrarSesion}>
Salir
</button>

)

}

export default BotonCerrarSesion;