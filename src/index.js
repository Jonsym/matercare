// index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambia ReactDOM por createRoot
import './index.css'; // Importa los estilos de Tailwind
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // Crea un root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
