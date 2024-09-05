import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica si los datos coinciden con un usuario registrado
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.name === name && user.password === password) {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      alert('Credenciales inválidas. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#12100c]">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#151513] shadow-lg rounded-lg">
        <h2 className="text-3xl font-extrabold text-center text-[#fff]">
          Inicia Sesión
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#b38f4d]">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-transparent text-[#fff] border border-[#b38f4d] rounded-md shadow-sm focus:outline-none focus:ring-[#b38f4d] focus:border-[#b38f4d] sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#b38f4d]">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 bg-transparent text-[#fff] border border-[#b38f4d] rounded-md shadow-sm focus:outline-none focus:ring-[#b38f4d] focus:border-[#b38f4d] sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#b38f4d] hover:bg-[#a68043] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b38f4d]"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-[#fff]">
          ¿Aun no tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-[#b38f4d] hover:text-[#a68043]"> Registrate </Link>  
        </p>
      </div>
    </div>
  );
};

export default Login;
