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

        <div className="panel-container">

            <img 
            src="https://static.vecteezy.com/system/resources/thumbnails/019/495/567/small/barber-shop-and-shaving-machine-logo-design-vector.jpg"
            alt="logo"
            className="logo"
            />

            <h1>Bienvenido Cliente </h1>

            <div className="panel-box">

                <button className="btn agendar" onClick={()=>navigate("/agendar")}>
                     Agendar cita
                </button>


                <button className="btn Barberos" onClick={()=>navigate("/barberos")}>
                Ver Barberos
                </button>


                <button onClick={()=>navigate("/miscitas")}>
                Ver Mis Citas
                </button>

                <button onClick={cerrarSesion}>
                    Salir
                    </button>


            </div>

        </div>

    )

}

export default PanelCliente;
