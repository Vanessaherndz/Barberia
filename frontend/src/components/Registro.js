import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro(){

const navigate = useNavigate();

const [nombre,setNombre] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const registrarUsuario = async ()=>{

const respuesta = await fetch("http://localhost:4000/usuarios/registro",{

method:"POST",
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify({
    nombre,
    email,
    password
    })

});

const data = await respuesta.json();

alert(data.mensaje);

navigate("/");

}

return(

    <div className="login-container">

            <div className="login-box">

            <h2>Registro</h2>

            <input
            type="text"
            placeholder="Nombre"
            onChange={(e)=>setNombre(e.target.value)}
            />

            <input
            type="email"
            placeholder="Correo"
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="Contraseña"
            onChange={(e)=>setPassword(e.target.value)}
            />

            <button onClick={registrarUsuario}>
            Registrarse
            </button>

            </div>

        </div>

    )

}

export default Registro;
