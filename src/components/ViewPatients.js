import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para gestionar la notificación
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationAction, setNotificationAction] = useState(null); // 'edit' o 'delete'
  const [selectedIndex, setSelectedIndex] = useState(null); // Índice del paciente

  // Cargar pacientes desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  // Actualizar los pacientes si se vuelve desde el formulario de edición
  useEffect(() => {
    if (location.state?.updatedPatient && location.state?.index !== undefined) {
      const { updatedPatient, index } = location.state;
      updatePatient(updatedPatient, index);
      window.history.replaceState({}, document.title); // Limpiar el estado para evitar duplicaciones
    }
  }, [location.state]);

  // Función para abrir la notificación con la acción y paciente seleccionados
  const openNotification = (action, index) => {
    setNotificationAction(action);
    setSelectedIndex(index);
    setIsNotificationOpen(true);
  };

  // Función para cerrar la notificación y resetear estados después de la animación de salida
  const closeNotification = () => {
    setIsNotificationOpen(false);
    setTimeout(() => {
      setNotificationAction(null);
      setSelectedIndex(null);
    }, 300); // Espera 300ms (igual al tiempo de la animación) antes de limpiar los estados
  };

  // Función para manejar la confirmación en la notificación
  const handleConfirm = () => {
    if (notificationAction === 'edit') {
      handleEdit(selectedIndex);
    } else if (notificationAction === 'delete') {
      handleDelete(selectedIndex);
    }
    closeNotification();
  };

  // Función para navegar al formulario de edición
  const handleEdit = (index) => {
    const patient = patients[index];
    navigate('/dashboard/register-patient', {
      state: { patient, index },
    });
  };

  // Función para eliminar un paciente
  const handleDelete = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  // Función para actualizar los datos del paciente en la lista
  const updatePatient = (updatedPatient, index) => {
    const updatedPatients = [...patients];
    updatedPatients[index] = updatedPatient;
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));

    // Actualizar en la base de datos
    fetch('http://localhost/matercare-backend/updatepatient.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPatient),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (!result.success) {
          throw new Error(result.error || 'Error desconocido al actualizar el paciente');
        }
        // Asegurarse de que el estado local se actualiza después de la respuesta de la base de datos
        const updatedPatientsAfterDb = [...patients];
        updatedPatientsAfterDb[index] = updatedPatient;
        setPatients(updatedPatientsAfterDb);
      })
      .catch((error) => {
        alert('Error al actualizar el paciente en la base de datos: ' + error.message);
      });
  };

  // Filtrar pacientes según el término de búsqueda
  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Manejo de la tecla 'Esc' para cerrar la notificación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isNotificationOpen) {
        closeNotification();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isNotificationOpen]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="bg-[#2e2b27] shadow-lg rounded-lg w-full max-w-7xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#f0e9dd] text-center">Lista de Pacientes</h2>
        
        {/* Input del buscador */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nombre, teléfono o referencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-[#2e2b27] rounded-md border border-[#ffffff20] focus:outline-none focus:ring-2 focus:ring-[#b38f4d]"
          />
        </div>

        {filteredPatients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-[#ffffff20] text-[#f0e9dd]">
              <thead>
                <tr className="bg-[#1e1d1b] text-left text-sm md:text-base">
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Hora</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Nombre</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Edad</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">IMSS Bienestar</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Teléfono</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Referencia</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20]">Motivo</th>
                  <th className="px-4 py-3 border-b-2 border-[#ffffff20] text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={index} className="bg-[#2e2b27] hover:bg-[#3a3732] transition duration-150">
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.requestTime}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.name}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.age}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.insurance}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.phone}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm whitespace-nowrap">{patient.reference}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm break-words max-w-xs">{patient.reason}</td>
                    <td className="px-4 py-3 border-b border-[#ffffff20] text-sm text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openNotification('edit', index)}
                          className="text-[#b38f4d] hover:text-[#d6ab5f] transition-colors duration-200"
                          aria-label="Editar Paciente"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => openNotification('delete', index)}
                          className="text-[#b38f4d] hover:text-[#d6ab5f] transition-colors duration-200"
                          aria-label="Eliminar Paciente"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-[#f0e9dd] text-center">No se encontraron pacientes.</p>
        )}
      </div>

      {/* Notificación de Confirmación */}
      <div
        className={`fixed top-6 right-6 z-50 w-80 bg-gradient-to-r from-[#44403c] to-[#1e1d1b] text-[#f0e9dd] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out ${
          isNotificationOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        aria-live="assertive"
      >
        <div className="flex justify-between items-center p-4 border-b border-[#ffffff20]">
          <div className="flex items-center">
            {/* Icono dinámico según la acción */}
            {notificationAction === 'edit' ? (
              <FaEdit className="text-blue-500 mr-2" size={20} />
            ) : (
              <FaTrash className="text-red-500 mr-2" size={20} />
            )}
            <h3 className="text-lg font-semibold">
              {notificationAction === 'edit' ? 'Confirmar Edición' : 'Confirmar Eliminación'}
            </h3>
          </div>
          <button onClick={closeNotification} className="text-gray-400 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="p-4">
          <p className="text-sm">
            {notificationAction === 'edit'
              ? `¿Está seguro que desea editar el registro de ${patients[selectedIndex]?.name}?`
              : `¿Está seguro que desea eliminar el registro de ${patients[selectedIndex]?.name}?`}
          </p>
        </div>
        <div className="flex justify-end p-4 space-x-2 border-t border-[#ffffff20]">
          <button
            onClick={closeNotification}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded transition ${
              notificationAction === 'delete'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {notificationAction === 'delete' ? 'Eliminar' : 'Editar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewPatients;
