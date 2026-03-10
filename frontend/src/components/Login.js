import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const iniciarSesion = async () => {

    try{

      const respuesta = await fetch("http://localhost:4000/usuarios/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email:email,
          password:password
        })
      });

      const data = await respuesta.json();

      console.log(data);

      if(data.usuario){

        // guardar datos del usuario
        localStorage.setItem("usuarioId", data.usuario._id);
        localStorage.setItem("usuarioNombre", data.usuario.nombre);
        localStorage.setItem("usuarioRol", data.usuario.rol);

        alert("Bienvenido " + data.usuario.nombre);

        // redirigir según el rol
        if(data.usuario.rol === "cliente"){
            navigate("/cliente");
        }

        if(data.usuario.rol === "admin"){
            navigate("/admin");
        }

      }else{
        alert("Correo o contraseña incorrectos");
      }

    }catch(error){

      console.error("Error:", error);
      alert("Error al conectar con el servidor");

    }

  };

  return(

    <div className="login-container">

      <div className="login-box">

        <h2>Barbería</h2>

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

        <button onClick={iniciarSesion}>
          Iniciar Sesión
        </button>

         <p onClick={()=>navigate("/registro")}>
          ¿No tienes cuenta? Regístrate
          </p>

      </div>


    </div>

  )

}

export default Login;

