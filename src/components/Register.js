import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de Toastify
import Header from './Header';

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Inicializar useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar el mensaje de error al enviar el formulario

        // Verifica que ambos campos no estén vacíos
        if (!fullname || !password) {
            toast.error('Todos los campos son obligatorios', {
                position: "top-right", // Posición en la esquina superior derecha
                autoClose: 3000, // Cierra automáticamente después de 3 segundos
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            const response = await fetch('http://localhost/matercare-backend/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ fullname, password })
            });

            const data = await response.json();

            if (data.status === 'success') {
                toast.success('¡Usuario registrado exitosamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/login'), // Redirigir al cerrar la notificación
                });
                setFullname('');
                setPassword('');
            } else {
                setError(data.message);
                toast.error(data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un problema al registrar el usuario.');
            toast.error('Hubo un problema al registrar el usuario.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center min-h-screen bg-[#12100c]">
                <div className="w-full max-w-md p-8 space-y-8 bg-[#151513] shadow-lg rounded-lg">
                    <h2 className="text-3xl font-extrabold text-center text-[#fff]">
                        Crea tu cuenta
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
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-[#fff]">
                        ¿Ya tienes una cuenta?{' '}
                        <Link to="/login" className="font-medium text-[#b38f4d] hover:text-[#a68043]">
                            Inicia Sesión
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
                theme="colored" // Puedes cambiar el tema a 'light', 'dark', 'colored'
                // limit={3} // Opcional: Limita el número de notificaciones simultáneas
            />
        </>
    );
};

export default Register;
