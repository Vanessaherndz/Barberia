import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./citasbarberoadmin.css"

function AdminCitas() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [filtroBarbero, setFiltroBarbero] = useState("");

  // Cargar  citas
  const cargarCitas = () => {
    fetch("http://localhost:4000/citas/admin")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error(error));
  };

  // barberos
  const cargarBarberos = () => {
    fetch("http://localhost:4000/barberos")
      .then((res) => res.json())
      .then((data) => setBarberos(data))
      .catch((error) => console.error(error));
  };

  //  datos al iniciar
  useEffect(() => {
    cargarCitas();
    cargarBarberos();
  }, []);

 
  const cambiarEstado = async (id, estado) => {
    try {
      const res = await fetch(`http://localhost:4000/citas/estado/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });

      const data = await res.json();
      alert(data.mensaje);
      cargarCitas();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el estado");
    }
  };

  
  const citasFiltradas = filtroBarbero
    ? citas.filter((c) => c.barbero?._id === filtroBarbero)
    : citas;

  return (
    <div className="citas-admin-container">

<button
className="btn-volver"
onClick={() => navigate("/admin")}
>
⬅ Ir al panel principal
</button>

<h2 className="titulo-admin">Gestión de Citas</h2>


{}

<div className="filtro-barbero">

<label>Filtrar por barbero:</label>

<select
value={filtroBarbero}
onChange={(e) => setFiltroBarbero(e.target.value)}
>

<option value="">Todos</option>

{barberos.map((barbero) => (

<option key={barbero._id} value={barbero._id}>
{barbero.nombre}
</option>

))}

</select>

</div>


{}

<div className="tabla-container">

<table className="tabla-citas-admin">

<thead>

<tr>
<th>Cliente</th>
<th>Barbero</th>
<th>Servicio</th>
<th>Fecha</th>
<th>Hora</th>
<th>Estado</th>
<th>Acciones</th>
</tr>

</thead>

<tbody>

{citasFiltradas.map((cita) => (

<tr key={cita._id}>

<td>{cita.cliente?.nombre || cita.cliente?.usuario || "Sin cliente"}</td>

<td>{cita.barbero?.nombre || "Sin barbero"}</td>

<td>{cita.servicio?.nombre || "Sin servicio"}</td>

<td>{new Date(cita.fecha).toLocaleDateString()}</td>

<td>
{new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString([], {
hour: "2-digit",
minute: "2-digit",
})}
</td>

<td className={`estado ${cita.estado}`}>
{cita.estado}
</td>

<td className="acciones">

{cita.estado?.toLowerCase() === "pendiente" && (

<>
<button
className="btn-confirmar"
onClick={() => cambiarEstado(cita._id, "confirmada")}
>
Confirmar
</button>

<button
className="btn-cancelar"
onClick={() => cambiarEstado(cita._id, "cancelada")}
>
Cancelar
</button>
</>

)}

{cita.estado === "confirmada" && (

<>
<button
className="btn-completar"
onClick={() => cambiarEstado(cita._id, "completada")}
>
Completar
</button>

<button
className="btn-cancelar"
onClick={() => cambiarEstado(cita._id, "cancelada")}
>
Cancelar
</button>
</>

)}

{cita.estado === "cancelada" && <span className="cancelada">Cancelada</span>}
{cita.estado === "completada" && <span className="finalizada">Finalizada</span>}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>
  );
}

export default AdminCitas;


