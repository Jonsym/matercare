import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import RegisterPatient from './RegisterPatient';
import ViewPatients from './ViewPatients';
import Statics from './Statics';

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-6">
        <Routes>
          {/* Establecemos Statics como la ruta predeterminada */}
          <Route path="/" element={<Navigate to="statics" />} />
          <Route path="statics" element={<Statics />} />
          <Route path="register-patient" element={<RegisterPatient />} />
          <Route path="view-patients" element={<ViewPatients />} />
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
