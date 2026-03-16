import React,{useState,useEffect} from "react";
import "./servicios.css"
import BotonVolver from "../components/botonvolver";

function AdminServicios(){


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




const editarServicio = (servicio)=>{

    setNombre(servicio.nombre);
    setPrecio(servicio.precio);
    setDescripcion(servicio.descripcion);

    setIdEditar(servicio._id);

    setEditando(true);

}



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

    <div className="servicios-admin-container">

        <BotonVolver/>

    <h2 className="titulo-admin">Gestión de Servicios</h2>

    <div className="form-servicio">

<h3>{editando ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>

        <input
            placeholder="Nombre del servicio"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            />

        <input
            type="number"
            placeholder="Precio"
            value={precio}
            onChange={(e)=>setPrecio(e.target.value)}
            />

        <input
            placeholder="Descripción"
            value={descripcion}
            onChange={(e)=>setDescripcion(e.target.value)}
            />

    <button
        className="btn-guardar"
        onClick={editando ? actualizarServicio : agregarServicio}
        >

        {editando ? "Actualizar Servicio" : "Agregar Servicio"}

    </button>

</div>


    <h3 className="titulo-tabla">Servicios Registrados</h3>

     <div className="tabla-container">

        <table className="tabla-servicios">

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

                    <td className="precio">L {servicio.precio}</td>

                    <td>{servicio.descripcion}</td>

                    <td>

                    <button
                        className="btn-editar"
                        onClick={()=>editarServicio(servicio)}
                        >
                        Editar
                    </button>

                    </td>

                    <td>

                    <button
                        className="btn-eliminar"
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

</div>

)

}

export default AdminServicios;
