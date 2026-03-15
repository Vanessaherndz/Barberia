import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import PanelCliente from "./components/PanelCliente";
import AgendarCita from "./components/AgendarCita";
import Registro from "./components/Registro";
import MisCitas from "./components/MisCitas";
import VerBarberos from "./components/VerBarberos";
import PanelAdmin from "./pages/PanelAdmin";
import AdminBarberos from "./pages/AdminBarbero";
import AdminServicios from "./pages/AdminServicios";
import AdminCitas from "./pages/AdminCitas";
import AdminDashboard from "./pages/AdminDashboard";



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

        <Route path="/admin" element={<PanelAdmin/>} />
        <Route path="/admin/barberos" element={<AdminBarberos/>}/>
        <Route path="/admin/servicios" element={<AdminServicios/>}/>
        <Route path="/admin/citas" element={<AdminCitas />} />
        <Route path="/admin/reportes" element={<AdminDashboard />} />


      </Routes>

    </Router>

  )

}

export default App;
