import React, { useEffect, useState } from "react";
import "./AgendarCita.css";
import { useNavigate } from "react-router-dom";


function AgendarCita(){

    const navigate = useNavigate();

    const [barberos,setBarberos] = useState([]);
    const [servicios,setServicios] = useState([]);

    const [barbero,setBarbero] = useState("");
    const [servicio,setServicio] = useState("");
    const [fecha,setFecha] = useState("");
    const [hora,setHora] = useState("");
    const [horasOcupadas, setHorasOcupadas] = useState([]);


    const cliente = localStorage.getItem("usuarioId");
    const horasDisponibles = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00"
    ];


    // cargar barberos
    useEffect(()=>{

        fetch("http://localhost:4000/barberos")
        .then(res=>res.json())
        .then(data=>setBarberos(data))

    },[])

    // cargar servicios
    useEffect(()=>{

        fetch("http://localhost:4000/servicios")
        .then(res=>res.json())
        .then(data=>setServicios(data))

    },[])

    // cargar horas ocupadas cuando se seleccione barbero y fecha
    useEffect(()=>{

        if(barbero && fecha){

            fetch(`http://localhost:4000/citas/barbero/${barbero}/${fecha}`)
            .then(res=>res.json())
            .then(data=>{

                const ocupadas = data.map(cita => cita.hora);

                setHorasOcupadas(ocupadas);

            })

        }

    },[barbero,fecha])



    const crearCita = async () =>{

        const respuesta = await fetch("http://localhost:4000/citas/crear",{

            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                cliente,
                barbero,
                servicio,
                fecha,
                hora
            })

        });

        const data = await respuesta.json();

        alert(data.mensaje);
        navigate("/cliente");

    }


    return(

        <div className="cita-container">

            <h2>Reservar Cita</h2>

            <div className="form-box">

                <label>Barbero</label>

                <select onChange={(e)=>setBarbero(e.target.value)}>

                    <option>Seleccione barbero</option>

                    {barberos.map(barbero=>(
                        <option key={barbero._id} value={barbero._id}>
                            {barbero.nombre}
                        </option>
                    ))}

                </select>


                <label>Servicio</label>

                <select onChange={(e)=>setServicio(e.target.value)}>

                    <option>Seleccione servicio</option>

                    {servicios.map(servicio=>(
                        <option key={servicio._id} value={servicio._id}>
                            {servicio.nombre}
                        </option>
                    ))}

                </select>


                <label>Fecha</label>

                <input
                type="date"
                onChange={(e)=>setFecha(e.target.value)}
                />

                <label>Hora</label>

                <select onChange={(e)=>setHora(e.target.value)}>

                <option>Seleccione hora</option>

                {horasDisponibles.map(h => (

                <option
                key={h}
                value={h}
                disabled={horasOcupadas.includes(h)}
                >

                {horasOcupadas.includes(h) ? h + " (ocupada)" : h}

                </option>

                ))}

                </select>


                <button className="btn agendar" onClick={crearCita}>
                Agendar cita
                </button>




            </div>

        </div>

    )

}

export default AgendarCita;
