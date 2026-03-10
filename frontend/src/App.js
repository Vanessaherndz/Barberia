import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import PanelCliente from "./components/PanelCliente";
import AgendarCita from "./components/AgendarCita";
import Registro from "./components/Registro";
import MisCitas from "./components/MisCitas";
import VerBarberos from "./components/VerBarberos";


function App(){

  return(

    <Router>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/cliente" element={<PanelCliente />} />

        <Route path="/agendar" element={<AgendarCita />} />

        <Route path="/registro" element={<Registro />} />

        <Route path="/miscitas" element={<MisCitas />} />

        <Route path="/barberos" element={<VerBarberos/>} />

      </Routes>

    </Router>

  )

}

export default App;
