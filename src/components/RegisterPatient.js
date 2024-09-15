import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function RegisterPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    requestTime: '',
    name: '',
    age: '',
    insurance: '',
    phone: '',
    reference: '',
    reason: ''
  });

  useEffect(() => {
    if (location.state?.patient) {
      setPatient(location.state.patient);
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];

    if (isEditing) {
      const updatedPatients = storedPatients.map((p) =>
        p.phone === patient.phone ? patient : p
      );
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
    } else {
      localStorage.setItem('patients', JSON.stringify([...storedPatients, patient]));
    }

    setPatient({
      requestTime: '',
      name: '',
      age: '',
      insurance: '',
      phone: '',
      reference: '',
      reason: ''
    });
    navigate('/dashboard/view-patients');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-[#b38f4d]">
        {isEditing ? 'Editar Paciente' : 'Registrar Paciente'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-gray-700">Hora de Solicitud:</label>
          <input
            type="datetime-local"
            name="requestTime"
            value={patient.requestTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"

            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Edad:</label>
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Seguro Popular:</label>
          <input
            type="text"
            name="insurance"
            value={patient.insurance}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700">Referencia:</label>
          <input
            type="text"
            name="reference"
            value={patient.reference}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-2 text-gray-700">Motivo de consulta:</label>
          <textarea
            name="reason"
            value={patient.reason}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#b38f4d] focus:border-[#b38f4d] hover:border-[#b38f4d] sm:text-sm transition-all duration-300 ease-in-out"
            required
          />
        </div>
      </div>
      <button type="submit" className="bg-[#b38f4d] text-white p-3 rounded-lg mt-6 hover:bg-[#9e7e3b] transition duration-200">
        {isEditing ? 'Guardar Cambios' : 'Registrar'}
      </button>
    </form>
  );
}

export default RegisterPatient;
