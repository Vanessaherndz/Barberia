import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminCitas() {
  const navigate = useNavigate();

  const [citas, setCitas] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [filtroBarbero, setFiltroBarbero] = useState("");

  // Cargar todas las citas
  const cargarCitas = () => {
    fetch("http://localhost:4000/citas/admin")
      .then((res) => res.json())
      .then((data) => setCitas(data))
      .catch((error) => console.error(error));
  };

  // Cargar barberos
  const cargarBarberos = () => {
    fetch("http://localhost:4000/barberos")
      .then((res) => res.json())
      .then((data) => setBarberos(data))
      .catch((error) => console.error(error));
  };

  // Cargar datos al iniciar
  useEffect(() => {
    cargarCitas();
    cargarBarberos();
  }, []);

  // Cambiar estado de la cita
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

  // Filtrar citas por barbero
  const citasFiltradas = filtroBarbero
    ? citas.filter((c) => c.barbero?._id === filtroBarbero)
    : citas;

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => navigate("/admin")}>Ir al panel principal</button>

      <h2>Gestión de Citas</h2>

      {/* FILTRO BARBEROS */}
      <div style={{ marginTop: "20px" }}>
        <label>Filtrar por barbero: </label>
        <select value={filtroBarbero} onChange={(e) => setFiltroBarbero(e.target.value)}>
          <option value="">Todos</option>
          {barberos.map((barbero) => (
            <option key={barbero._id} value={barbero._id}>
              {barbero.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* TABLA DE CITAS */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
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
              <td
                style={{
                  color:
                    cita.estado === "pendiente"
                      ? "orange"
                      : cita.estado === "confirmada"
                      ? "blue"
                      : cita.estado === "completada"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {cita.estado}
              </td>
              <td>
                {cita.estado?.toLowerCase() === "pendiente" && (
                  <>
                    <button onClick={() => cambiarEstado(cita._id, "confirmada")}>
                      Confirmar
                    </button>
                    <button
                      onClick={() => cambiarEstado(cita._id, "cancelada")}
                      style={{ marginLeft: "5px" }}
                    >
                      Cancelar
                    </button>
                  </>
                )}

                {cita.estado === "confirmada" && (
                  <>
                    <button onClick={() => cambiarEstado(cita._id, "completada")}>
                      Completar
                    </button>
                    <button
                      onClick={() => cambiarEstado(cita._id, "cancelada")}
                      style={{ marginLeft: "5px" }}
                    >
                      Cancelar
                    </button>
                  </>
                )}

                {cita.estado === "cancelada" && <span>Cancelada</span>}
                {cita.estado === "completada" && <span>Finalizada</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminCitas;


