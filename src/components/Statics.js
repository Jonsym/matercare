import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statics() {
  const [patients, setPatients] = useState([]);

  // Se carga la lista de pacientes desde localStorage
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedPatients = JSON.parse(localStorage.getItem('patients')) || [];
      setPatients(updatedPatients);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Función para eliminar un paciente
  const handleDelete = (id) => {
    const updatedPatients = patients.filter(patient => patient.id !== id); // Filtrar solo el paciente con el id proporcionado
    setPatients(updatedPatients); // Actualizar el estado
    localStorage.setItem('patients', JSON.stringify(updatedPatients)); // Actualizar el localStorage
  };

  // Función para agrupar pacientes por fecha
  const groupByDate = (patients) => {
    const grouped = {};

    patients.forEach(patient => {
      const date = new Date(patient.requestTime).toLocaleDateString(); // Formato: "MM/DD/YYYY"
      if (!grouped[date]) {
        grouped[date] = 0;
      }
      grouped[date]++;
    });

    return grouped;
  };

  // Agrupar pacientes por fecha
  const groupedPatients = groupByDate(patients);

  // Preparar los datos para el gráfico
  const chartData = {
    labels: Object.keys(groupedPatients), // Fechas
    datasets: [
      {
        label: 'Pacientes por Día',
        data: Object.values(groupedPatients), // Número de pacientes por día
        backgroundColor: '#b38f4d', // Color de las barras
        borderRadius: 5,
        barThickness: 20, // Grosor de las barras
        animation: {
          duration: 1000, // Duración de la animación
          easing: 'easeOutQuart', // Tipo de animación
        }
      }
    ]
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-[#b38f4d] mb-4">Estadísticas</h2>
      <p className="text-lg mb-4">Total de Pacientes Registrados: {patients.length}</p>
      
      {/* Gráfico de barras */}
      <div className="mb-6">
        <Bar 
          data={chartData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Pacientes Registrados por Día',
                font: { size: 18 },
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => `${tooltipItem.raw} pacientes`, // Tooltip personalizado
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Día',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Número de Pacientes',
                },
                min: 0,
              }
            },
          }} 
          height={400} // Altura del gráfico
        />
      </div>

      {/* Lista de pacientes */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Listado de Pacientes</h3>
        <ul>
          {patients.map(patient => (
            <li key={patient.id} className="flex justify-between items-center py-2">
              <span>{patient.name} ({patient.requestTime})</span>
              <button
                onClick={() => handleDelete(patient.id)} // Llamamos a la función de eliminación con el id del paciente
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Statics;

