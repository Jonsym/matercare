import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle } from 'react-icons/fa';

function RegisterPatient() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState({
    id: null,
    requestTime: '',
    name: '',
    age: '',
    insurance: '',
    phone: '',
    reference: '',
    reason: '',
    patient_curp: '',
    patient_birthdate: '',
    relative_name: '',
    address: '',
    street: '',
    neighborhood: '',
    house_number: '',
    postal_code: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    if (isEditing) {
      const index = patients.findIndex((p) => p.id === patient.id);
      if (index !== -1) {
        patients[index] = patient;
        toast.success('Cambios guardados correctamente', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          icon: <FaCheckCircle />, 
          onClose: () => navigate('/dashboard/view-patients', { state: { updatedPatient: patient }, replace: true })
        });
      }
    } else {
      patient.id = new Date().getTime(); // Asignar un ID único basado en el timestamp
      patients.push(patient);
      toast.success('Paciente registrado exitosamente', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: <FaCheckCircle />, 
        onClose: () => navigate('/dashboard/view-patients', { state: { updatedPatient: patient }, replace: true })
      });
    }
    localStorage.setItem('patients', JSON.stringify(patients));

    try {
      const response = await fetch('http://localhost/matercare-backend/addpatient.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Error desconocido al registrar el paciente');
      }
    } catch (error) {
      alert('Error al registrar el paciente: ' + error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-8">
        <h2 className="text-2xl font-semibold text-[#b38f4d]">
          {isEditing ? 'Editar Paciente' : 'Registrar Paciente'}
        </h2>

        {/* Información del Paciente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700">Hora de Solicitud:</label>
            <input
              type="datetime-local"
              name="requestTime"
              value={patient.requestTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Nombre Completo:</label>
            <input
              type="text"
              name="name"
              value={patient.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex space-x-6">
            <div>
              <label className="block mb-2 text-gray-700">IMSS Bienestar:</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="insurance"
                    value="Sí"
                    checked={patient.insurance === 'Sí'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Sí
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="insurance"
                    value="No"
                    checked={patient.insurance === 'No'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  No
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Teléfono:</label>
              <input
                type="tel"
                name="phone"
                value={patient.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Referencia:</label>
            <input
              type="text"
              name="reference"
              value={patient.reference}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Motivo de Consulta:</label>
            <input
              type="text"
              name="reason"
              value={patient.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">CURP del Paciente:</label>
            <input
              type="text"
              name="patient_curp"
              value={patient.patient_curp}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="patient_birthdate"
              value={patient.patient_birthdate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Nombre del Familiar:</label>
            <input
              type="text"
              name="relative_name"
              value={patient.relative_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>
        </div>

        {/* Datos de Dirección */}
        <div className="mt-6 pt-4 border-t border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700">Datos de Dirección</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block mb-2 text-gray-700">Dirección:</label>
              <input
                type="text"
                name="address"
                value={patient.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Calle:</label>
              <input
                type="text"
                name="street"
                value={patient.street}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Colonia:</label>
              <input
                type="text"
                name="neighborhood"
                value={patient.neighborhood}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Número:</label>
              <input
                type="text"
                name="house_number"
                value={patient.house_number}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-700">Código Postal:</label>
              <input
                type="text"
                name="postal_code"
                value={patient.postal_code}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 px-6 py-3 bg-[#b38f4d] text-white font-semibold rounded-lg hover:bg-[#d6ab5f]"
        >
          {isEditing ? 'Guardar Cambios' : 'Registrar Paciente'}
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default RegisterPatient;
