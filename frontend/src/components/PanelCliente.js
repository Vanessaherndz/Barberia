import React from "react";
import "./PanelCliente.css";
import { useNavigate } from "react-router-dom";




function PanelCliente(){
const navigate = useNavigate();
        const cerrarSesion = () => {

        localStorage.removeItem("usuarioId");
        localStorage.removeItem("usuarioNombre");
        localStorage.removeItem("usuarioRol");

        navigate("/");

        }

    return(

        <div className="panel-cliente">

            <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/019/495/567/small/barber-shop-and-shaving-machine-logo-design-vector.jpg"
            alt="logo"
            className="logo"
            />

            <h1>Bienvenido Cliente </h1>

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

                <button className="btn btn-salir" onClick={cerrarSesion}>
                    Salir
                    </button>
                </div>

            </div>

        </div>

    )

}

export default PanelCliente;
