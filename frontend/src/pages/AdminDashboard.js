import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "./reporte.css";
import BotonVolver from "../components/botonvolver";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard(){

const [estados,setEstados] = useState([])
const [barberoTop,setBarberoTop] = useState(null)
const [servicioTop,setServicioTop] = useState(null)
const [citasDia,setCitasDia] = useState([])

useEffect(()=>{

async function cargarDatos(){

try{


const resEstados = await fetch("http://localhost:4000/reporte/estados")
const dataEstados = await resEstados.json()
setEstados(dataEstados || [])


const resBarbero = await fetch("http://localhost:4000/reporte/barbero-top")
const dataBarbero = await resBarbero.json()
setBarberoTop(dataBarbero[0] || null)


const resServicio = await fetch("http://localhost:4000/reporte/servicio-top")
const dataServicio = await resServicio.json()
setServicioTop(dataServicio[0] || null)

// CITA
const resCitasDia = await fetch("http://localhost:4000/reporte/citas-dia")
const dataCitasDia = await resCitasDia.json()
setCitasDia(dataCitasDia || [])

}catch(error){

console.error("Error cargando dashboard:",error)

}

}

cargarDatos()

},[])


// GRAFICA ESTADOS
const estadosData = {
  labels: estados.map(e => e._id),
  datasets:[
    {
      label:"Citas",
      data: estados.map(e => e.total),

        backgroundColor:[
        "#f1c40f", // pendiente
        "#3498db", // confirmada
        "#2ecc71", // completada
        "#e74c3c"  // cancelada
        ],

      borderColor:"#716d6d",
      borderWidth:2
    }
  ]
}


// GRAFICA CITAS DIA
const citasDiaData = {
labels: citasDia.map(c => "Dia " + c._id),
  datasets:[
    {
    label:"Citas por día",
    data: citasDia.map(c => c.total),
    backgroundColor:"#d4af37",
    borderRadius:6,
    borderWidth:0
    }
  ]
}

const opcionesGrafica = {
    plugins:{
    legend:{
    labels:{
    color:"white"
    }
  }
},
scales:{
    x:{
      ticks:{color:"white"},
      grid:{color:"#333"}
    },
    y:{
      ticks:{color:"white"},
      grid:{color:"#333"}
    }
  }
}


return(

  <div className="dashboard">
    <BotonVolver/>

    <h1>Dashboard Administrador</h1>

    <div className="cards">

      <div className="card">
        <h3>Barbero con más citas</h3>

        {
          barberoTop ? (
            <p>
              {barberoTop.barbero?.nombre} ({barberoTop.total} citas)
            </p>
            ) : (
            <p>No hay datos</p>
          )
        }

      </div>

        <div className="card">
          <h3>Servicio más solicitado</h3>

          {
            servicioTop ? (
            <p>
              {servicioTop.servicio?.nombre} ({servicioTop.total} citas)
            </p>
            ) : (<p>No hay datos</p>)
          }

        </div>

        </div>

        <div className="charts">

          <div className="chart">
            <h3>Citas por Estado</h3>

            {
            estados.length > 0
            ? <Pie data={estadosData} options={opcionesGrafica}/>
            : <p>No hay datos</p>
            }

        </div>

          <div className="chart">
            <h3>Citas por Día</h3>

            {
            citasDia.length > 0
            ? <Bar data={citasDiaData}/>
            : <p>No hay datos</p>
            }
         </div>
      </div>

    </div>
  )

}

export default AdminDashboard;

