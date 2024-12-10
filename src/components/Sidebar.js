import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenuOpen } from 'react-icons/md';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa'; 
import { IoReceipt, IoStatsChart } from "react-icons/io5"; // Íconos

const menuItems = [
  {
    icons: <IoStatsChart size={24} />,
    label: 'Estadísticas',
    link: '/dashboard/statics',
  },
  {
    icons: <FaUserPlus size={24} />,
    label: 'Registrar Paciente',
    link: '/dashboard/register-patient',
  },
  {
    icons: <IoReceipt size={24} />,
    label: 'Ver Pacientes',
    link: '/dashboard/view-patients',
  }
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // Estado para el modal
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutConfirm(true); // Abre el modal al intentar cerrar sesión
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false); // Cierra el modal
    navigate('/'); // Redirige a la página principal
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false); // Cierra el modal sin redirigir
  };

  // Cierra el modal al presionar la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowLogoutConfirm(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Barra Lateral */}
      <nav className={`shadow-lg h-screen p-4 flex flex-col duration-500 bg-[#12100c] text-[#b38f4d] ${open ? 'w-64' : 'w-20'}`}>
        
        {/* Encabezado de la Barra Lateral */}
        <div className='flex items-center justify-between h-20'>
          <h1 className={`text-white font-bold text-xl ml-4 ${!open && 'hidden'} duration-300`}>
            Mater.Care
          </h1>
          <MdMenuOpen 
            size={30} 
            className={`cursor-pointer text-white ${!open && 'rotate-180'}`} 
            onClick={() => setOpen(!open)} 
          />
        </div>

        {/* Cuerpo de la Barra Lateral con Menús */}
        <ul className='flex-1'>
          {menuItems.map((item, index) => (
            <li key={index} className='relative group'>
              <Link 
                to={item.link} 
                className='flex items-center gap-4 py-3 px-2 rounded-lg hover:bg-[#b38f4d] hover:text-white duration-300'
              >
                <div className='text-[#b38f4d] group-hover:text-white'>
                  {item.icons}
                </div>
                <span className={`text-lg ${!open && 'hidden'} duration-300`}>{item.label}</span>
              </Link>
              
              {/* Tooltip para cuando la barra lateral está colapsada */}
              {!open && (
                <span className="absolute left-16 bg-white text-black px-2 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 group-hover:left-20 transition-all duration-300">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>

        {/* Pie de Página con Botón de Cerrar Sesión */}
        <div className='flex flex-col items-start'>
          <button 
            onClick={handleLogout} 
            className='flex items-center gap-4 px-2 py-3 rounded-lg hover:bg-[#b38f4d] hover:text-white duration-300'
          >
            <FaSignOutAlt size={24} />
            <span className={`text-lg ${!open && 'hidden'} duration-300`}>Cerrar sesión</span>
          </button>
        </div>
      </nav>

      {/* Modal de Confirmación Estilo iPhone en la Parte Superior Derecha con Difuminado y Animación Suave */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-start justify-end p-4 z-50">
          {/* Fondo difuminado */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"
            onClick={cancelLogout} // Cerrar modal al hacer clic fuera
          ></div>
          
          {/* Contenedor del Modal */}
          <div 
            className="bg-white rounded-3xl shadow-2xl w-80 p-6 transform transition-transform duration-500 ease-in-out 
                       translate-y-[-20px] opacity-0 animate-slideIn"
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">¿Cerrar Sesión?</h2>
            <p className="mb-6 text-center text-gray-600">¿Estás seguro de que deseas cerrar sesión?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={confirmLogout} 
                className="px-4 py-2 bg-red-500 text-white rounded-full w-24 hover:bg-red-600 transition-colors duration-200"
              >
                Sí
              </button>
              <button 
                onClick={cancelLogout} 
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full w-24 hover:bg-gray-300 transition-colors duration-200"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación personalizada para el modal */}
      <style jsx="true">{`
        @keyframes slideIn {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s forwards;
        }
      `}</style>
    </>
  );
}
