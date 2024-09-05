import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { MdMenuOpen } from 'react-icons/md'; // Asegúrate de importar el ícono correcto
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; // Añadir icono para cerrar sesión
import { IoHomeOutline } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa"; // Cambié el icono para 'Registrar Paciente'

const menuItems = [
  {
    icons: <FaUserPlus size={30} />,
    label: 'Registrar Paciente',
    link: '/dashboard/register-patient', // Ruta corregida
  },
  {
    icons: <IoHomeOutline size={30} />,
    label: 'Ver Pacientes',
    link: '/dashboard/view-patients', // Ruta corregida
  }
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate(); // Hook para redirección

  const handleLogout = () => {
    // Aquí puedes implementar la lógica para cerrar sesión, como eliminar el token, etc.
    navigate('/'); // Redirige a la página de inicio (o `Home.js`)
  };

  return (
    <nav className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${open ? 'w-60' : 'w-16'}`}>
      
      {/* Header */}
      <div className='px-3 py-2 h-20 flex justify-between items-center'>
        <div>
          <MdMenuOpen size={34} className={`duration-500 cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
        </div>
      </div>

      {/* Body */}
      <ul className='flex-1'>
        {menuItems.map((item, index) => (
          <li key={index} className='px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group'>
            <Link to={item.link} className='flex gap-2 items-center'>
              <div>{item.icons}</div>
              <p className={`${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>{item.label}</p>
              <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16`}>
                {item.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className='flex-1 flex flex-col justify-end'>
        <div className='flex items-center gap-2 px-3 py-2'>
          <div><FaUserCircle size={30} /></div>
          <div className={`leading-5 ${!open && 'w-0 translate-x-24'} duration-500 overflow-hidden`}>
            <p>Saheb</p>
            <span className='text-xs'>saheb@gmail.com</span>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className='flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-blue-800 rounded-md duration-300 mt-4'
        >
          <FaSignOutAlt size={30} className={`transition-all duration-300 ${!open && 'scale-75'}`} />
          <span className={`${!open && 'hidden'} duration-500`}>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );
}
