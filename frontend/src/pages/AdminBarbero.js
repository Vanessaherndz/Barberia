import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./barbero.css"

function AdminBarberos(){

const navigate = useNavigate();

const [barberos,setBarberos] = useState([]);

const [nombre,setNombre] = useState("");
const [especialidad,setEspecialidad] = useState("");
const [foto,setFoto] = useState("");

const [editando,setEditando] = useState(false);
const [idEditar,setIdEditar] = useState("");


// cargar barberos
const cargarBarberos = ()=>{

fetch("http://localhost:4000/barberos")
.then(res=>res.json())
.then(data=>setBarberos(data))

}


// cargar al iniciar
useEffect(()=>{
cargarBarberos();
},[])



// AGREGAR BARBERO
const agregarBarbero = async ()=>{

const respuesta = await fetch("http://localhost:4000/barberos/crear",{

method:"POST",

headers:{
    "Content-Type":"application/json"
    },

body:JSON.stringify({
    nombre,
    especialidad,
    foto
})

})

const data = await respuesta.json();

    alert(data.mensaje);

    setNombre("");
    setEspecialidad("");
    setFoto("");

    cargarBarberos();

}



// EDITAR BARBERO
const editarBarbero = (barbero)=>{

    setNombre(barbero.nombre);
    setEspecialidad(barbero.especialidad);
    setFoto(barbero.foto);

    setIdEditar(barbero._id);

    setEditando(true);

}



// ACTUALIZAR BARBERO
const actualizarBarbero = async ()=>{

const respuesta = await fetch("http://localhost:4000/barberos/editar",{

method:"POST",

headers:{
    "Content-Type":"application/json"
    },

body:JSON.stringify({

    id_editar:idEditar,
    nombre_editar:nombre,
    especialidad_editar:especialidad

})

})

await respuesta.json();

    alert("Barbero actualizado");

    setEditando(false);

    setNombre("");
    setEspecialidad("");
    setFoto("");

    cargarBarberos();

}



// ELIMINAR BARBERO
const eliminarBarbero = async (id)=>{

    const respuesta = await fetch(`http://localhost:4000/barberos/borrar/${id}`);

    const data = await respuesta.json();

    alert(data.mensaje);

    cargarBarberos();

}



return(
        <div className="barberos-admin-container">

            <button
                className="btn-volver"
                onClick={()=>navigate("/admin")}
            >
            Ir al panel principal
            </button>

        <h2 className="titulo-admin">Gestión de Barberos</h2>

        <div className="form-barbero">

        <h3>{editando ? "Editar Barbero" : "Agregar Nuevo Barbero"}</h3>

        <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e)=>setNombre(e.target.value)}
        />

        <input
        placeholder="Especialidad"
        value={especialidad}
        onChange={(e)=>setEspecialidad(e.target.value)}
        />

        <input
        placeholder="URL Foto"
        value={foto}
        onChange={(e)=>setFoto(e.target.value)}
        />

        <button
        className="btn-guardar"
        onClick={editando ? actualizarBarbero : agregarBarbero}
        >
        {editando ? "Actualizar Barbero" : "Agregar Barbero"}
        </button>

        </div>

        <h3 className="titulo-tabla">Barberos Registrados</h3>

        <div className="tabla-container">

        <table className="tabla-barberos">

        <thead>

        <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Editar</th>
            <th>Eliminar</th>
        </tr>

        </thead>

        <tbody>

        {barberos.map(barbero=>(

        <tr key={barbero._id}>

        <td>

        <img
        src={barbero.foto}
        alt=""
        className="foto-barbero"
        />

        </td>

        <td>{barbero.nombre}</td>

        <td>{barbero.especialidad}</td>

        <td>

        <button
            className="btn-editar"
            onClick={()=>editarBarbero(barbero)}
            >
        Editar
        </button>

        </td>

        <td>

        <button
            className="btn-eliminar"
            onClick={()=>eliminarBarbero(barbero._id)}
            >
        Eliminar
        </button>

        </td>

        </tr>

        ))}

        </tbody>

        </table>

        </div>

        </div>
)

}

export default AdminBarberos;


