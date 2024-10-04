import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';  // Importa el Chatbot

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative"> {/* Contenedor principal */}
        {/* Rutas de tu aplicación */}
        <Routes>
          <Route path="/" element={<Home />} />               {/* Página principal */}
          <Route path="/login" element={<Login />} />         {/* Ruta de inicio de sesión */}
          <Route path="/register" element={<Register />} />   {/* Ruta de registro */}
          <Route path="/dashboard/*" element={<Dashboard />} /> {/* Ruta del dashboard */}
        </Routes>

        {/* Chatbot estará disponible en todas las rutas */}
        <div className="fixed bottom-4 right-4 z-50"> {/* Asegura que el chatbot siempre esté arriba */}
          <Chatbot />
        </div>
      </div>
    </Router>
  );
};

export default App;
