import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import video3d from '../assets/video3d.mp4';

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
        src={video3d}
      ></video>
      <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
    </div>
    <div className="relative flex flex-col justify-center items-center h-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-widest text-gray-300 uppercase">
          Un espacio diseñado para mejorar tu trabajo
        </p>
        <BubbleText />
        <p className="mt-4 max-w-3xl mx-auto text-lg font-normal text-gray-300 sm:text-xl lg:text-2xl">
          EN EL AREA DEL MODULO MATER DE GINECOLOGIA Y OBSTETRICIA
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

const BubbleText = () => {
  useEffect(() => {
    const spans = document.querySelectorAll(".hover-text span");

    spans.forEach((span) => {
      span.addEventListener("mouseenter", function () {
        this.style.fontWeight = "900";
        this.style.color = "rgb(238, 242, 255)";

        const leftNeighbor = this.previousElementSibling;
        const rightNeighbor = this.nextElementSibling;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "500";
          leftNeighbor.style.color = "rgb(199, 210, 254)";
        }
        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "500";
          rightNeighbor.style.color = "rgb(199, 210, 254)";
        }
      });

      span.addEventListener("mouseleave", function () {
        this.style.fontWeight = "100";
        this.style.color = "rgb(165, 180, 252)";

        const leftNeighbor = this.previousElementSibling;
        const rightNeighbor = this.nextElementSibling;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "100";
          leftNeighbor.style.color = "rgb(165, 180, 252)";
        }

        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "100";
          rightNeighbor.style.color = "rgb(165, 180, 252)";
        }
      });
    });
  }, []);

  return (
    <h1 className="hover-text mt-6 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
      <Text>CONTROL INTERNO DE PACIENTES</Text>
    </h1>
  );
};

const Text = ({ children }) => {
  return (
    <>
      {children.split("").map((child, idx) => (
        <span
          style={{
            transition: "0.35s font-weight, 0.35s color",
          }}
          key={idx}
        >
          {child}
        </span>
      ))}
    </>
  );
};

const Home = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => setExpanded(prev => !prev);

  return (
    <div className="bg-black w-full h-screen">
      <header className="py-4 bg-black sm:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <a href="/" title="" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">Mater.Care</span>
              </a>
            </div>

            <div className="flex md:hidden">
              <MenuButton expanded={expanded} onClick={toggleMenu} />
            </div>

            <nav className="hidden md:flex md:items-center md:justify-end md:space-x-12">
              <NavLink to="/register">Regístrate</NavLink>
              <NavLink to="/login">Inicia Sesión</NavLink>
            </nav>
          </div>

          {expanded && (
            <nav className="flex flex-col pt-8 pb-4 space-y-6 md:hidden">
              <NavLink to="/register">Regístrate</NavLink>
              <NavLink to="/login">Inicia Sesión</NavLink>
            </nav>
          )}
        </div>
      </header>
      <HeroSection />
    </div>
  );
};

export default Home;
