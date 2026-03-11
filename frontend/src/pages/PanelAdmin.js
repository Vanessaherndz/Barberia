import React from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function PanelAdmin(){

const navigate = useNavigate();

return(

    <div className="admin-container">

        <h1>Panel Administrador</h1>

            <div className="admin-menu">

                <button onClick={()=>navigate("/admin/barberos")}>
                Agregar Barbero
                </button>

                <button onClick={()=>navigate("/admin/servicios")}>
                Agregar Servicio
                </button>

                <button onClick={()=>navigate("/admin/citas")}>
                Ver Citas
                </button>

                <button onClick={()=>navigate("/admin/reportes")}>
                Reportes
                </button>

                <button onClick={()=>navigate("/")}>
                Cerrar Sesión
                </button>

            </div>

        </div>

    )

}

export default PanelAdmin;
