import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import videohome from '../assets/videohome.mp4';

const MenuButton = ({ expanded, onClick }) => (
  <button
    type="button"
    className="text-white"
    onClick={onClick}
    aria-expanded={expanded}
    aria-label={expanded ? "Cerrar menú" : "Abrir menú"}
  >
    {!expanded ? (
      <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ) : (
      <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
  </button>
);

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-base font-medium text-gray-400 transition-colors duration-300 hover:text-white"
  >
    {children}
  </Link>
);

const HeroSection = () => (
  <section className="relative w-full h-screen bg-black border-4 border-black rounded-2xl">
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <video
        className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
        preload="metadata"
        loop
        playsInline
        autoPlay
        muted
        aria-hidden="true"
        src={videohome}
      ></video>
      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
    </div>
    <div className="relative flex flex-col justify-center items-center h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-gray-300 uppercase">
          Un espacio diseñado para mejorar tu trabajo
        </p>
        <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="bg-gradient-to-r from-gray-200 to-gray-400 text-transparent bg-clip-text">
            Control Interno De Pacientes
          </span>
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg font-normal text-gray-300 sm:text-xl lg:text-2xl">
          En el Area del Módulo Mater de Ginecología y Obstetricia
        </p>
        <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
          <Link
            to="/Register"
            className="relative inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-black border border-transparent rounded-full shadow-md transition-transform duration-300 hover:scale-105"
            role="button"
          >
            Empieza aquí!
          </Link>
        </div>
        <div className="mt-8">
          <svg className="w-8 h-8 text-gray-300 mx-auto" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
          </svg>
        </div>
      </div>
    </div>
  </section>
);

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => setExpanded(prev => !prev);

  return (
    <div className="bg-black w-full h-screen">
      <header className="py-4 bg-black sm:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <a href="#" title="" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">Mater.Care</span>
              </a>
            </div>

            <div className="flex md:hidden">
              <MenuButton expanded={expanded} onClick={toggleMenu} />
            </div>

            <nav className="hidden md:flex md:items-center md:justify-end md:space-x-12">
              <NavLink to="/login">Inicia Sesión</NavLink>
              <NavLink to="/register">Regístrate</NavLink>
            </nav>
          </div>

          {expanded && (
            <nav className="flex flex-col pt-8 pb-4 space-y-6 md:hidden">
              <NavLink to="/login">Inicia Sesión</NavLink>
              <NavLink to="/register">Regístrate</NavLink>
            </nav>
          )}
        </div>
      </header>

      <HeroSection />
    </div>
  );
};

export default Home;
