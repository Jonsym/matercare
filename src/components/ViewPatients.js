import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar los íconos

function ViewPatients() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleEdit = (patient) => {
    navigate('/dashboard/register-patient', { state: { patient } });
  };

  const handleDelete = (phone) => {
    const updatedPatients = patients.filter((patient) => patient.phone !== phone);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-[#2e2b27] shadow-lg rounded-lg w-full max-w-7xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-[#f0e9dd] text-center">Lista de Pacientes</h2>
        {patients.length > 0 ? (
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
                {patients.map((patient) => (
                  <tr key={patient.phone} className="bg-[#2e2b27] hover:bg-[#1e1d1b] transition duration-150">
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
                          onClick={() => handleEdit(patient)}
                          className="text-[#b38f4d] hover:text-[#d6ab5f] transition-colors duration-200"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.phone)} // Cambia a patient.phone
                          className="text-[#b38f4d] hover:text-[#d6ab5f] transition-colors duration-200"
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
          <p className="text-[#f0e9dd] text-center">No hay pacientes registrados.</p>
        )}
      </div>
    </div>
  );
}

export default ViewPatients;

