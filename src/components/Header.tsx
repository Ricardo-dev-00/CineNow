import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-secondary shadow-lg sticky top-0 z-40">
      <div className="container-app">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-accent p-2 rounded-lg group-hover:scale-110 transition-transform">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-textPrimary">
              Cine<span className="text-accent">Now</span>
            </span>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <a
              href="#em-cartaz"
              className="text-textPrimary hover:text-accent transition-colors font-medium"
            >
              Em Cartaz
            </a>
            <a
              href="#proximos-lancamentos"
              className="text-textPrimary hover:text-accent transition-colors font-medium"
            >
              Próximos Lançamentos
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
