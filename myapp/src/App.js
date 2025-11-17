import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import Reservations from "./components/Reservation/Reservations";
import Vehicles from "./components/Vehicles/Vehicles";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <HeaderBar />

        <div className="content-container">
          <Routes>
            {/* Default Page */}
            <Route path="/" element={<Reservations />} />

            {/* Pages */}
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
