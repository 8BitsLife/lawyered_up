import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LawyerDashboard from "./pages/LawyerDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import HowItWorks from "./pages/HowItWorks";
import LawyerProfile from "./pages/LawyerProfile";
import FindLawyers from "./pages/FindLawyers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/find-lawyers" element={<FindLawyers />} />
        <Route path="/lawyer/:id" element={<LawyerProfile />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
