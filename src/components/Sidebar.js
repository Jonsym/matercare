import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdMenuOpen } from 'react-icons/md';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa'; 
import { IoReceipt } from "react-icons/io5";

const menuItems = [
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
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className={`shadow-lg h-screen p-4 flex flex-col duration-500 bg-[#12100c] text-[#b38f4d] ${open ? 'w-64' : 'w-20'}`}>
      
      {/* Header */}
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

      {/* Body */}
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
            
            {/* Tooltip */}
            {!open && (
              <span className="absolute left-16 bg-white text-black px-2 py-1 rounded-lg shadow-md opacity-0 group-hover:opacity-100 group-hover:left-20 transition-all duration-300">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Footer */}
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
  );
}
