import React, { useState, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el chatbot está abierto o cerrado
  const [showHelpText, setShowHelpText] = useState(false); // Controla la visibilidad del texto de ayuda
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Preguntas y respuestas predefinidas con variantes
  const faq = {
    // Variaciones para "Hola"
    "Hi": "Hola, ¿en qué te puedo ayudar?.",
    "Hola": "Hola, ¿en qué te puedo ayudar?.",
    "hi": "Hola, ¿en qué te puedo ayudar?.",
    "hola": "Hola, ¿en qué te puedo ayudar?.",

    // Variaciones para "¿Qué es MaterCare?"
    "Que es matercare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "que es matercare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "qué es matercare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "qué es MaterCare": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "que es matercare": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "QUE ES MATERCARE?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",
    "¿Qué es MaterCare?": "Es una plataforma en dónde puedes registrar a los pacientes que ingresan al módulo mater de Ginecología y Obstetricia.",

    // Variaciones para "¿Cómo inicio sesión?"
    "Como inicio sesion": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como inicio sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "cómo inicio sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como inicio sesion?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como puedo iniciar sesion?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "Como puedo iniciar sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "como puedo iniciar sesion": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "cómo puedo iniciar sesión?": "Puedes iniciar sesión dentro de las pestañas de 'Inicia Sesión' si ya tienes una cuenta registrada. Si no tienes cuenta, haz clic en 'Regístrate'.",
    "donde inicio sesion": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "dónde inicio sesión": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "Dónde inicio sesión?": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",
    "dónde inicio sesion?": "Puedes iniciar sesión en la pestaña superior derecha 'Inicia Sesión'.",

    // Variaciones para "¿Cómo me registro?"
    "Como me registro?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como me registro?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "cómo me registro?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "cómo me registro": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registarme?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "como puedo registrar?": "Puedes registrarte en la pestaña de la parte superior derecha 'Regístrate'.",
    "donde me puedo registrar": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    "dónde me puedo registrar": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",
    "Como puedo registrarme": "Puedes crear una cuenta dentro de la pestaña 'Regístrate'.",

    // Variaciones para "¿Qué debo ingresar para crear una cuenta?"
    "qué debo ingresar para crear una cuenta": "Debes ingresar tu nombre completo y una contraseña que solo tú recuerdes en el futuro.",
    "que debo ingresar para crear una cuenta": "Debes ingresar tu nombre completo y una contraseña que solo tú recuerdes en el futuro.",
    "qué debo poner para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",
    "que debo poner para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",
    "que debo ingresar para registrarme": "Debes ingresar tu nombre completo y una contraseña para luego iniciar sesión con el botón 'Iniciar Sesión'.",

    // Variaciones para "Tengo problemas al registrarme"
    "tengo problemas al registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "tengo problemas para registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "No puedo registrarme": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "No puedo crear mi cuenta": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente.",
    "no puedo crear mi cuenta": "Si tienes problemas, recarga la página o espera unos minutos. Intenta ingresar nuevamente los datos correctamente."
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

  // Muestra el texto "¿Necesitas ayuda?" cada cierto tiempo
  useEffect(() => {
    const helpTimer = setTimeout(() => {
      setShowHelpText(true);
      setTimeout(() => {
        setShowHelpText(false); // Oculta el texto después de unos segundos
      }, 3000); // El mensaje de ayuda se muestra por 3 segundos
    }, 5000); // Aparece cada 5 segundos
    return () => clearTimeout(helpTimer);
  }, [isOpen]); // Reinicia el temporizador cuando se abre o cierra el chatbot

  return (
    <div className="fixed bottom-4 right-4">
      {/* Burbuja flotante */}
      {!isOpen && (
        <div className="relative">
          <button
            className="bg-[#b38f4d] text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <FaRobot className="text-3xl" />
          </button>
          {/* Texto de ayuda que aparece cada cierto tiempo */}
          {showHelpText && (
            <div className="absolute -top-8 -left-16 bg-white text-black text-xs p-2 rounded-lg shadow-lg">
              <div className="relative">
                {/* Nube con el triángulo apuntando a la burbuja */}
                <span className="absolute -bottom-1 left-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></span>
                <p>¿Necesitas ayuda?</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chatbot expandido */}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-xl flex flex-col relative">
          {/* Header del Chatbot */}
          <div className="flex items-center justify-between bg-[#b38f4d] text-white p-4 rounded-t-xl">
            <div className="flex items-center space-x-2">
              <FaRobot className="text-xl" />
              <h1 className="font-semibold">Mater.Care Chatbot</h1>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Zona de conversación */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-100 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none" // Mensajes del usuario
                      : "bg-gray-300 text-black rounded-bl-none" // Mensajes del bot
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input para mensajes */}
          <div className="flex items-center border-t border-gray-300 p-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="ml-2 bg-[#b38f4d] text-white p-2 rounded-lg hover:bg-[#c59134]"
              onClick={handleSendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
