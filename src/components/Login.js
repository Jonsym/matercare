import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Para redirigir al dashboard

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar mensaje de error

        // Verifica que ambos campos no estén vacíos
        if (!fullname || !password) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await fetch('http://localhost/matercare-backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, password }) // Enviar las credenciales como JSON
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert('Inicio de sesión exitoso');
                navigate('/dashboard'); // Redirigir al dashboard tras un inicio exitoso
            } else {
                setError(data.message); // Mostrar el mensaje de error del backend
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al iniciar sesión.');
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
                            <label htmlFor="fullname" className="block text-sm font-medium text-[#b38f4d]">
                                Nombre Completo
                            </label>
                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                required
                                placeholder="Nombre completo"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
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

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
                   ¿No tienes una cuenta?{' '}
                  <Link to="/register" className="font-medium text-[#b38f4d] hover:text-[#a68043]">
                     Regístrate
                   </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
