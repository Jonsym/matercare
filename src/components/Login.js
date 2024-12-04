import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaExclamationCircle, FaBell, FaTimesCircle } from 'react-icons/fa';
import Header from './Header';

const Login = () => {
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!fullname || !password) {
            toast.error(
                <div className="custom-toast">
                    <FaExclamationCircle className="toast-icon" />
                    <span>Todos los campos son obligatorios</span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    icon: false,
                }
            );
            return;
        }

        try {
            const response = await fetch('http://localhost/matercare-backend/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullname, password })
            });

            const data = await response.json();

            if (data.status === 'success') {
                toast.success(
                    <div className="custom-toast">
                        <FaCheckCircle className="toast-icon" />
                        <span>¡Inicio de sesión exitoso!</span>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        onClose: () => navigate('/dashboard'),
                        icon: false,
                    }
                );
                setFullname('');
                setPassword('');
            } else {
                setError(data.message);
                toast.error(
                    <div className="custom-toast">
                        <FaTimesCircle className="toast-icon" />
                        <span>{data.message}</span>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        icon: false,
                    }
                );
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al iniciar sesión.');
            toast.error(
                <div className="custom-toast">
                    <FaBell className="toast-icon" />
                    <span>Hubo un problema al iniciar sesión.</span>
                </div>,
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    icon: false,
                }
            );
        }
    };

    return (
        <>
            {/* Estilos personalizados para Toastify */}
            <style>
                {`
                /* Estilos generales para los toasts */
                .Toastify__toast {
                    border-radius: 12px;
                    padding: 16px 24px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    min-height: 48px;
                    transition: all 0.3s ease-in-out;
                }

                /* Estilo para toasts de éxito */
                .Toastify__toast--success {
                    background: #4cd964; /* Verde similar al de iOS */
                    color: white;
                }

                /* Estilo para toasts de error */
                .Toastify__toast--error {
                    background: #ff3b30; /* Rojo similar al de iOS */
                    color: white;
                }

                /* Icono personalizado */
                .toast-icon {
                    margin-right: 12px;
                    font-size: 20px;
                }

                /* Contenido del toast */
                .custom-toast {
                    display: flex;
                    align-items: center;
                }

                /* Estilo de la barra de progreso */
                .Toastify__progress-bar {
                    background: white;
                    height: 4px;
                    border-radius: 0 0 12px 12px;
                }

                /* Animaciones suaves */
                .Toastify__animated--fadeIn {
                    animation: fadeIn 0.5s forwards;
                }

                .Toastify__animated--fadeOut {
                    animation: fadeOut 0.5s forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
                `}
            </style>

            <Header />
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

};

export default Login;
