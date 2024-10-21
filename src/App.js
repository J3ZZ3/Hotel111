import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ClientLogin from "./components/client/ClientLogin";
import ClientRegister from "./components/client/ClientRegister";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRegister from "./components/admin/AdminResgister";
import AddAdmin from "./components/admin/AddAdmin";
import ClientDashboard from "./components/client/ClientDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import Booking from "./components/client/Booking";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/client-register" element={<ClientRegister />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/book-room/:roomId" element={<Booking />} />
      </Routes>
    </Router>
  );
}

export default App;