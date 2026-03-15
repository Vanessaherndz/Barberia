import React from "react";
import { useNavigate } from "react-router-dom";
import "./paneladmin.css";

function PanelAdmin(){

const navigate = useNavigate();

return(

    <div className="admin-container">

    <h1 className="admin-titulo">Panel Administrador</h1>

    <div className="admin-menu">

        <button className="admin-btn" onClick={()=>navigate("/admin/barberos")}>
            Agregar Barbero
        </button>

        <button className="admin-btn" onClick={()=>navigate("/admin/servicios")}>
            Agregar Servicio
        </button>

        <button className="admin-btn" onClick={()=>navigate("/admin/citas")}>
            Ver Citas
        </button>

        <button className="admin-btn" onClick={()=>navigate("/admin/reportes")}>
            Reportes
        </button>

        <button className="admin-btn salir" onClick={()=>navigate("/")}>
            Cerrar Sesión
        </button>

    </div>

</div>
    )

}

export default PanelAdmin;
