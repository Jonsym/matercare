import React, { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaRobot, FaTimes, FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el chatbot está abierto o cerrado
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isListening, setIsListening] = useState(false); // Estado para el dictado por voz
  const recognitionRef = useRef(null); // Referencia al reconocimiento de voz

  // Preguntas y respuestas predefinidas con variantes
  const faq = {
    // Variaciones para "Hola"
    "hi": "Hola, ¿en qué te puedo ayudar?",
    "hola": "Hola, ¿en qué te puedo ayudar?",
    
    // Variaciones para "¿Qué es MaterCare?"
    "que es matercare": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "qué es matercare": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "que es matercare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "qué es matercare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",

    // Variaciones para "¿Cómo inicio sesión?"
    "como inicio sesion": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como inicio sesion?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como inicio sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como puedo iniciar sesion": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como puedo iniciar sesion?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como puedo iniciar sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "donde inicio sesion": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "donde inicio sesion?": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "dónde inicio sesión?": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "dónde inicio sesion?": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    
    // Variaciones para "¿Cómo me registro?"
    "como me registro": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como me registro?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registarme": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registarme?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registrar": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registrar?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "donde me puedo registrar": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    "donde me puedo registrar?": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    "dónde me puedo registrar?": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    "como puedo registrarme?": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    
    // Variaciones para "¿Qué debo ingresar para crear una cuenta?"
    "que debo ingresar para crear una cuenta": "Debes ingresar tu nombre completo y una contraseña que solo tú recuerdes en el futuro.",
    "qué debo ingresar para crear una cuenta": "Debes ingresar tu nombre completo y una contraseña que solo tú recuerdes en el futuro.",
    "que debo poner para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",
    "qué debo poner para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",
    "que debo ingresar para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",
    
    // Variaciones para "Tengo problemas al registrarme"
    "tengo problemas al registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "tengo problemas para registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo registrarme?": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo crear mi cuenta": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo crear mi cuenta?": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    
    // Variaciones para "¿Cómo puedo registrar un paciente?"
    "como puedo registrar un paciente": "Para registrar un paciente, ve a la sección 'Registrar Paciente' en el menú lateral y completa el formulario con la información requerida.",
    "como puedo registrar un paciente?": "Para registrar un paciente, ve a la sección 'Registrar Paciente' en el menú lateral y completa el formulario con la información requerida.",
    "como registro un paciente": "Para registrar un paciente, dirígete a la sección 'Registrar Paciente' en el menú lateral y llena el formulario con los datos necesarios.",
    "como registro un paciente?": "Para registrar un paciente, dirígete a la sección 'Registrar Paciente' en el menú lateral y llena el formulario con los datos necesarios.",
    "como puedo agregar un paciente": "Para agregar un paciente, ve a 'Registrar Paciente' en el menú lateral y llena el formulario con los detalles del paciente.",
    "como puedo agregar un paciente?": "Para agregar un paciente, ve a 'Registrar Paciente' en el menú lateral y llena el formulario con los detalles del paciente.",
    
    // Variaciones para "¿Cómo puedo guardar un paciente?"
    "como puedo guardar un paciente": "Después de completar el formulario de registro, haz clic en el botón 'Guardar' para almacenar la información del paciente.",
    "como puedo guardar un paciente?": "Después de completar el formulario de registro, haz clic en el botón 'Guardar' para almacenar la información del paciente.",
    "como guardo los datos de un paciente": "Una vez que hayas llenado el formulario de registro, presiona 'Guardar' para almacenar los datos del paciente.",
    "como guardo los datos de un paciente?": "Una vez que hayas llenado el formulario de registro, presiona 'Guardar' para almacenar los datos del paciente.",
    "como puedo almacenar la informacion de un paciente": "Después de completar el formulario, haz clic en 'Guardar' para almacenar la información del paciente.",
    "como puedo almacenar la informacion de un paciente?": "Después de completar el formulario, haz clic en 'Guardar' para almacenar la información del paciente.",
    "como guardar los datos de un paciente": "Llena el formulario en 'Registrar Paciente' y luego haz clic en 'Guardar' para almacenar los datos.",
    "como guardar los datos de un paciente?": "Llena el formulario en 'Registrar Paciente' y luego haz clic en 'Guardar' para almacenar los datos.",
    
    // Variaciones para "¿Cómo puedo editar un paciente?"
    "como puedo editar un paciente": "Para editar un paciente, ve a la sección 'Ver Pacientes', selecciona el paciente que deseas modificar y haz clic en 'Editar'.",
    "como puedo editar un paciente?": "Para editar un paciente, ve a la sección 'Ver Pacientes', selecciona el paciente que deseas modificar y haz clic en 'Editar'.",
    "como editar los datos de un paciente": "Accede a 'Ver Pacientes', elige el paciente que deseas editar y selecciona la opción 'Editar'.",
    "como editar los datos de un paciente?": "Accede a 'Ver Pacientes', elige el paciente que deseas editar y selecciona la opción 'Editar'.",
    "como modifico la informacion de un paciente": "Para modificar la información, dirígete a 'Ver Pacientes', selecciona el paciente y haz clic en 'Editar'.",
    "como modifico la informacion de un paciente?": "Para modificar la información, dirígete a 'Ver Pacientes', selecciona el paciente y haz clic en 'Editar'.",
    "como puedo cambiar los datos de un paciente": "Ve a 'Ver Pacientes', selecciona el paciente que quieres cambiar y haz clic en 'Editar'.",
    "como puedo cambiar los datos de un paciente?": "Ve a 'Ver Pacientes', selecciona el paciente que quieres cambiar y haz clic en 'Editar'.",
    
    // Variaciones para "¿Cómo puedo eliminar un paciente?"
    "como puedo eliminar un paciente": "Para eliminar un paciente, ve a 'Ver Pacientes', selecciona el paciente que deseas eliminar y haz clic en 'Eliminar'.",
    "como puedo eliminar un paciente?": "Para eliminar un paciente, ve a 'Ver Pacientes', selecciona el paciente que deseas eliminar y haz clic en 'Eliminar'.",
    "como eliminar un paciente": "Accede a 'Ver Pacientes', selecciona el paciente y presiona 'Eliminar' para quitarlo del sistema.",
    "como eliminar un paciente?": "Accede a 'Ver Pacientes', selecciona el paciente y presiona 'Eliminar' para quitarlo del sistema.",
    "como borro un paciente": "Para borrar un paciente, dirígete a 'Ver Pacientes', elige el paciente y haz clic en 'Eliminar'.",
    "como borro un paciente?": "Para borrar un paciente, dirígete a 'Ver Pacientes', elige el paciente y haz clic en 'Eliminar'.",
    "como puedo quitar un paciente": "Ve a 'Ver Pacientes', selecciona el paciente que quieres quitar y presiona 'Eliminar'.",
    "como puedo quitar un paciente?": "Ve a 'Ver Pacientes', selecciona el paciente que quieres quitar y presiona 'Eliminar'.",
    
    // Variaciones para "¿Cómo puedo ver los pacientes?"
    "como puedo ver los pacientes": "Para ver los pacientes, dirígete a la sección 'Ver Pacientes' en el menú lateral.",
    "como puedo ver los pacientes?": "Para ver los pacientes, dirígete a la sección 'Ver Pacientes' en el menú lateral.",
    "como ver los pacientes": "Accede a 'Ver Pacientes' en el menú lateral para ver la lista completa de pacientes.",
    "como ver los pacientes?": "Accede a 'Ver Pacientes' en el menú lateral para ver la lista completa de pacientes.",
    "donde puedo ver los pacientes": "Puedes ver los pacientes en la sección 'Ver Pacientes' del menú lateral.",
    "donde puedo ver los pacientes?": "Puedes ver los pacientes en la sección 'Ver Pacientes' del menú lateral.",
    "como accedo a la lista de pacientes": "Ve a 'Ver Pacientes' en el menú lateral para acceder a la lista completa de pacientes.",
    "como accedo a la lista de pacientes?": "Ve a 'Ver Pacientes' en el menú lateral para acceder a la lista completa de pacientes.",
    
    // Variaciones para "¿Cómo puedo generar informes?"
    "como puedo generar informes": "Para generar informes, ve a la sección 'Estadísticas' en el menú lateral y selecciona el tipo de informe que deseas crear.",
    "como puedo generar informes?": "Para generar informes, ve a la sección 'Estadísticas' en el menú lateral y selecciona el tipo de informe que deseas crear.",
    "como generar informes": "Accede a 'Estadísticas' en el menú lateral y elige el tipo de informe que necesitas.",
    "como generar informes?": "Accede a 'Estadísticas' en el menú lateral y elige el tipo de informe que necesitas.",
    "como puedo crear un informe": "Dirígete a 'Estadísticas' en el menú lateral y selecciona el informe que deseas generar.",
    "como puedo crear un informe?": "Dirígete a 'Estadísticas' en el menú lateral y selecciona el informe que deseas generar.",
    "como hacer informes": "Para hacer informes, ve a 'Estadísticas' en el menú lateral y elige el tipo de informe.",
    "como hacer informes?": "Para hacer informes, ve a 'Estadísticas' en el menú lateral y elige el tipo de informe.",
    
    // Variaciones para "¿Cómo puedo buscar un paciente?"
    "como puedo buscar un paciente": "En la sección 'Ver Pacientes', utiliza la barra de búsqueda para encontrar el paciente que deseas.",
    "como puedo buscar un paciente?": "En la sección 'Ver Pacientes', utiliza la barra de búsqueda para encontrar el paciente que deseas.",
    "como buscar un paciente": "Accede a 'Ver Pacientes' y usa la barra de búsqueda para localizar al paciente que buscas.",
    "como buscar un paciente?": "Accede a 'Ver Pacientes' y usa la barra de búsqueda para localizar al paciente que buscas.",
    "como puedo encontrar un paciente": "Ve a 'Ver Pacientes' y utiliza la barra de búsqueda para encontrar al paciente deseado.",
    "como puedo encontrar un paciente?": "Ve a 'Ver Pacientes' y utiliza la barra de búsqueda para encontrar al paciente deseado.",
    "como localizar un paciente": "En 'Ver Pacientes', emplea la barra de búsqueda para localizar al paciente que necesitas.",
    "como localizar un paciente?": "En 'Ver Pacientes', emplea la barra de búsqueda para localizar al paciente que necesitas.",
    
    // Variaciones para "¿Cómo puedo cambiar mi contraseña?"
    "como puedo cambiar mi contraseña": "Para cambiar tu contraseña, ve a la configuración de tu cuenta y selecciona 'Cambiar Contraseña'.",
    "como puedo cambiar mi contraseña?": "Para cambiar tu contraseña, ve a la configuración de tu cuenta y selecciona 'Cambiar Contraseña'.",
    "como cambiar mi contraseña": "Accede a la configuración de tu cuenta y elige la opción 'Cambiar Contraseña' para actualizarla.",
    "como cambiar mi contraseña?": "Accede a la configuración de tu cuenta y elige la opción 'Cambiar Contraseña' para actualizarla.",
    "como puedo actualizar mi contraseña": "Dirígete a la configuración de tu cuenta y selecciona 'Cambiar Contraseña' para actualizarla.",
    "como puedo actualizar mi contraseña?": "Dirígete a la configuración de tu cuenta y selecciona 'Cambiar Contraseña' para actualizarla.",
    "como actualizar mi contraseña": "Ve a la configuración de tu cuenta y haz clic en 'Cambiar Contraseña' para actualizar tu contraseña.",
    "como actualizar mi contraseña?": "Ve a la configuración de tu cuenta y haz clic en 'Cambiar Contraseña' para actualizar tu contraseña.",
    
    // Variaciones para "¿Cómo puedo acceder al dashboard?"
    "como puedo acceder al dashboard": "Para acceder al dashboard, inicia sesión con tus credenciales y serás redirigido automáticamente.",
    "como puedo acceder al dashboard?": "Para acceder al dashboard, inicia sesión con tus credenciales y serás redirigido automáticamente.",
    "como acceder al dashboard": "Inicia sesión con tus credenciales y se te dirigirá al dashboard.",
    "como acceder al dashboard?": "Inicia sesión con tus credenciales y se te dirigirá al dashboard.",
    "como entro al dashboard": "Inicia sesión con tus datos y serás llevado al dashboard.",
    "como entro al dashboard?": "Inicia sesión con tus datos y serás llevado al dashboard.",
    "como puedo ingresar al dashboard": "Para ingresar al dashboard, simplemente inicia sesión con tus credenciales.",
    "como puedo ingresar al dashboard?": "Para ingresar al dashboard, simplemente inicia sesión con tus credenciales.",
    
    // Variaciones para "¿Cómo puedo ver mis estadísticas?"
    "como puedo ver mis estadísticas": "Ve a la sección 'Estadísticas' en el menú lateral para ver tus estadísticas.",
    "como puedo ver mis estadísticas?": "Ve a la sección 'Estadísticas' en el menú lateral para ver tus estadísticas.",
    "como ver mis estadísticas": "Accede a 'Estadísticas' en el menú lateral para visualizar tus datos estadísticos.",
    "como ver mis estadísticas?": "Accede a 'Estadísticas' en el menú lateral para visualizar tus datos estadísticos.",
    "como puedo acceder a mis estadísticas": "Dirígete a 'Estadísticas' en el menú lateral para acceder a tus estadísticas.",
    "como puedo acceder a mis estadísticas?": "Dirígete a 'Estadísticas' en el menú lateral para acceder a tus estadísticas.",
    "como visualizar mis estadísticas": "Ve a 'Estadísticas' en el menú lateral para visualizar tus estadísticas.",
    "como visualizar mis estadísticas?": "Ve a 'Estadísticas' en el menú lateral para visualizar tus estadísticas.",
    
    // Variaciones para "¿Cómo puedo filtrar pacientes?"
    "como puedo filtrar pacientes": "En la sección 'Ver Pacientes', utiliza las opciones de filtro para refinar tu búsqueda.",
    "como puedo filtrar pacientes?": "En la sección 'Ver Pacientes', utiliza las opciones de filtro para refinar tu búsqueda.",
    "como filtrar pacientes": "Accede a 'Ver Pacientes' y utiliza las herramientas de filtro para encontrar pacientes específicos.",
    "como filtrar pacientes?": "Accede a 'Ver Pacientes' y utiliza las herramientas de filtro para encontrar pacientes específicos.",
    "como puedo aplicar filtros a los pacientes": "Ve a 'Ver Pacientes' y emplea las opciones de filtro disponibles para refinar tu búsqueda.",
    "como puedo aplicar filtros a los pacientes?": "Ve a 'Ver Pacientes' y emplea las opciones de filtro disponibles para refinar tu búsqueda.",
    "como puedo ordenar pacientes": "En 'Ver Pacientes', usa las opciones de filtro y orden para organizar la lista de pacientes según tus necesidades.",
    "como puedo ordenar pacientes?": "En 'Ver Pacientes', usa las opciones de filtro y orden para organizar la lista de pacientes según tus necesidades.",
  };

  // Función para normalizar la pregunta del usuario (elimina signos de puntuación y convierte a minúsculas)
  const normalizeMessage = (message) => {
    return message
      .toLowerCase() // Convertir a minúsculas
      .replace(/[áéíóúü]/g, (m) => "aeiou"[ "áéíóúü".indexOf(m)]) // Eliminar acentos
      .replace(/[^a-z0-9 ]/g, ""); // Eliminar signos de puntuación
  };

  // Función para manejar el envío de mensajes
  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const newMessages = [...messages, { sender: "user", text: userMessage }];
      setMessages(newMessages);

      // Normalizamos el mensaje del usuario
      const normalizedMessage = normalizeMessage(userMessage);

      // Respuesta automática del bot
      const botResponse = faq[normalizedMessage] || "Lo siento, no entiendo esa pregunta. Estoy aquí para ayudarte con preguntas sobre MaterCare.";

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: botResponse }
        ]);
      }, 1000);

      setUserMessage(""); // Limpia el input después de enviar
    }
  };

  // Función para manejar la tecla 'Enter'
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Enviar mensaje de bienvenida cuando el chatbot se abre
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = { sender: "bot", text: "Hola, ¿en qué te puedo ayudar?" };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Inicializar reconocimiento de voz
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setUserMessage(speechToText);
        handleSendMessage();
      };

      recognition.onerror = (event) => {
        console.error("Error en reconocimiento de voz:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("El reconocimiento de voz no es compatible en este navegador.");
    }
  }, [faq]);

  // Función para iniciar o detener el dictado por voz
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        setIsListening(true);
      }
    }
  };

  // Cierra el chatbot al presionar la tecla Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4">
      {/* Botón de apertura del Chatbot */}
      {!isOpen && (
        <button
          className="bg-green-500 hover:bg-green-400 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors duration-300"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir Chatbot"
        >
          <FaRobot className="text-3xl" />
        </button>
      )}

      {/* Chatbot expandido */}
      {isOpen && (
        <div className="flex flex-col w-80 h-96 bg-white shadow-2xl rounded-xl overflow-hidden animate-fadeIn">
          {/* Header del Chatbot */}
          <div className="flex items-center justify-between bg-green-400 text-white p-4">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-2xl" />
              <h1 className="font-semibold">MaterCare Chatbot</h1>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Cerrar Chatbot">
              <FaTimes className="text-lg" />
            </button>
          </div>

          {/* Zona de conversación */}
          <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === "user"
                      ? "bg-green-400 text-white rounded-tr-none"
                      : "bg-gray-300 text-gray-800rounded-tl-none"
                  } shadow`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input para mensajes */}
          <div className="flex items-center border-t border-gray-300 p-2 bg-gray-200">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 rounded-lg focus:outline-none"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="ml-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-400 transition-colors duration-300"
              onClick={handleSendMessage}
              aria-label="Enviar Mensaje"
            >
              <FaPaperPlane />
            </button>
            {/* Botón de micrófono para dictado por voz */}
            <button
              className={`ml-2 p-2 rounded-full ${
                isListening ? "bg-green-500" : "bg-green-500"
              } text-white hover:bg-green-400 transition-colors duration-300`}
              onClick={toggleListening}
              aria-label="Dictado por Voz"
            >
              {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
            </button>
          </div>
        </div>
      )}

      {/* Animaciones personalizadas */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
