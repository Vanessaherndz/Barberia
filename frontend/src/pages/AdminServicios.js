import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

function AdminServicios(){

const navigate = useNavigate();

const [servicios,setServicios] = useState([]);

const [nombre,setNombre] = useState("");
const [precio,setPrecio] = useState("");
const [descripcion,setDescripcion] = useState("");

const [editando,setEditando] = useState(false);
const [idEditar,setIdEditar] = useState("");


// CARGAR SERVICIOS
const cargarServicios = ()=>{

fetch("http://localhost:4000/servicios")
.then(res=>res.json())
.then(data=>setServicios(data))

}

useEffect(()=>{
cargarServicios();
},[])



// AGREGAR SERVICIO
const agregarServicio = async ()=>{

const respuesta = await fetch("http://localhost:4000/servicios/crear",{

method:"POST",

    headers:{
    "Content-Type":"application/json"
    },

    body:JSON.stringify({

    nombre,
    precio,
    descripcion

    })

})

const data = await respuesta.json();

    alert(data.mensaje);

    setNombre("");
    setPrecio("");
    setDescripcion("");

    cargarServicios();

}



// EDITAR
const editarServicio = (servicio)=>{

    setNombre(servicio.nombre);
    setPrecio(servicio.precio);
    setDescripcion(servicio.descripcion);

    setIdEditar(servicio._id);

    setEditando(true);

}



// ACTUALIZAR
const actualizarServicio = async ()=>{

const respuesta = await fetch("http://localhost:4000/servicios/editar",{

method:"POST",

    headers:{
    "Content-Type":"application/json"
    },

    body:JSON.stringify({

    id_editar:idEditar,
    nombre_editar:nombre,
    precio_editar:precio,
    descripcion_editar:descripcion

    })

})

const data = await respuesta.json();

    alert(data.mensaje);

    setEditando(false);

    setNombre("");
    setPrecio("");
    setDescripcion("");

    cargarServicios();

}



// ELIMINAR
const eliminarServicio = async (id)=>{

const respuesta = await fetch(`http://localhost:4000/servicios/borrar/${id}`);

const data = await respuesta.json();

alert(data.mensaje);

cargarServicios();

}



return(

<div style={{padding:"40px"}}>

<button
    onClick={()=>navigate("/admin")}>
 Ir al panel principal
</button>

<h2>Gestión de Servicios</h2>

<h3>{editando ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>


<input
    placeholder="Nombre del servicio"
    value={nombre}
    onChange={(e)=>setNombre(e.target.value)}
/>

<br/><br/>

<input
    type="number"
    placeholder="Precio"
    value={precio}
    onChange={(e)=>setPrecio(e.target.value)}
/>

<br/><br/>

<input
    placeholder="Descripción"
    value={descripcion}
    onChange={(e)=>setDescripcion(e.target.value)}
/>

<br/><br/>


<button
    onClick={editando ? actualizarServicio : agregarServicio}
>

    {editando ? "Actualizar Servicio" : "Agregar Servicio"}

</button>


<hr/>

<h3>Servicios Registrados</h3>


<table border="1" cellPadding="10">

<thead>

    <tr>
    <th>Nombre</th>
    <th>Precio</th>
    <th>Descripción</th>
    <th>Editar</th>
    <th>Eliminar</th>
    </tr>

</thead>


<tbody>

    {servicios.map(servicio=>(

<tr key={servicio._id}>

    <td>{servicio.nombre}</td>

    <td>L {servicio.precio}</td>

    <td>{servicio.descripcion}</td>

<td>

<button
    onClick={()=>editarServicio(servicio)}
>

    Editar

</button>

</td>


<td>

<button
    onClick={()=>eliminarServicio(servicio._id)}
    >

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

export default AdminServicios;
