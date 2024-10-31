// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 py-6 pl-6 transition duration-300 ease-in-out">
      <a
        href="/"
        className="text-white font-bold text-xl transition duration-300 ease-in-out transform hover:text-[#b38f4d] hover:-translate-x-1 hover:scale-105 hover:opacity-95"
        style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}
      >
        Mater.Care
      </a>
    </header>
  );
};

export default Header;
