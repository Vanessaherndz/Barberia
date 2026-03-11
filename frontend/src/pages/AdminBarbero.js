import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

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

<div style={{padding:"40px"}}>

<button
    onClick={()=>navigate("/admin")}
    style={{
    marginBottom:"20px",
    padding:"10px",
    cursor:"pointer"
}}
>

⬅ Ir al panel principal

    </button>


        <h2>Gestión de Barberos</h2>


        <h3>{editando ? "Editar Barbero" : "Agregar Nuevo Barbero"}</h3>


        <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
        />

        <br/><br/>


        <input
            placeholder="Especialidad"
            value={especialidad}
            onChange={(e)=>setEspecialidad(e.target.value)}
        />

        <br/><br/>


        <input
            placeholder="URL Foto"
            value={foto}
            onChange={(e)=>setFoto(e.target.value)}
        />

        <br/><br/>


            <button
                onClick={editando ? actualizarBarbero : agregarBarbero}
            >

            {editando ? "Actualizar Barbero" : "Agregar Barbero"}

    </button>


    <hr/>


    <h3>Barberos Registrados</h3>


    <table border="1" cellPadding="10">

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
        width="80"
    />

    </td>

    <td>{barbero.nombre}</td>

    <td>{barbero.especialidad}</td>


    <td>

    <button
    onClick={()=>editarBarbero(barbero)}>

        Editar

    </button>

    </td>


    <td>

    <button
        onClick={()=>eliminarBarbero(barbero._id)}>

    Eliminar

    </button>

    </td>


    </tr>

    ))}

    </tbody>

    </table>


    </div>

)

}

export default AdminBarberos;


