import React from "react";
import "./PanelCliente.css";
import { useNavigate } from "react-router-dom";
import BotonCerrarSesion from "./BotonCerrarSesion";




function PanelCliente(){
const navigate = useNavigate();
      

    return(

        <div className="panel-cliente">

            

            <h1 className="bienvenida">Bienvenido <span>Cliente</span></h1>

            <div className="card-panel">
                <div className="botones">

                <button className="btn btn-agendar" onClick={()=>navigate("/agendar")}>
                     Agendar cita
                </button>


                <button className="btn btn-barberos" onClick={()=>navigate("/barberos")}>
                Ver Barberos
                </button>


                <button className="btn btn-MisCitas" onClick={()=>navigate("/miscitas")}>
                Ver Mis Citas
                </button>

                <BotonCerrarSesion/>
                </div>

            </div>

        </div>

    )

}

export default PanelCliente;
