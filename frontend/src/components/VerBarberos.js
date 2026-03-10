import React, { useEffect, useState } from "react";

function VerBarberos(){

const [barberos,setBarberos] = useState([]);

useEffect(()=>{

fetch("http://localhost:4000/barberos")
.then(res=>res.json())
.then(data=>{
setBarberos(data);
})

},[])


return(

<div style={{padding:"40px"}}>

<h2>Barberos Disponibles</h2>

<div style={{display:"flex",gap:"20px",flexWrap:"wrap"}}>

{barberos.map(barbero=>(

<div key={barbero._id} style={{
border:"1px solid #ccc",
padding:"20px",
width:"200px",
textAlign:"center"
}}>

<img
src={barbero.foto}
alt={barbero.nombre}
style={{width:"150px",height:"150px",objectFit:"cover"}}
/>

<h3>{barbero.nombre}</h3>

<p>{barbero.especialidad}</p>

<p>{barbero.estado}</p>

</div>

))}

</div>

</div>

)

}

export default VerBarberos;
