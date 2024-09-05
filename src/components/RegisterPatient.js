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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? 'Editar Paciente' : 'Registrar Paciente'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2">Hora de Solicitud:</label>
          <input
            type="datetime-local"
            name="requestTime"
            value={patient.requestTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Edad:</label>
          <input
            type="number"
            name="age"
            value={patient.age}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Seguro Popular:</label>
          <input
            type="text"
            name="insurance"
            value={patient.insurance}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            value={patient.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Referencia:</label>
          <input
            type="text"
            name="reference"
            value={patient.reference}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Motivo de consulta:</label>
          <input
            type="text"
            name="reason"
            value={patient.reason}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
        {isEditing ? 'Guardar Cambios' : 'Registrar'}
      </button>
    </form>
  );
}

export default RegisterPatient;
