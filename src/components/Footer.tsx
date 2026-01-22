import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary border-t border-gray-800 mt-16">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group w-fit">
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
            <p className="text-textSecondary text-sm max-w-xs">
              Descubra os filmes em cartaz e próximos lançamentos nos cinemas mais próximos de você.
            </p>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-textPrimary font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#em-cartaz"
                  className="text-textSecondary hover:text-accent transition-colors text-sm"
                >
                  Filmes em Cartaz
                </a>
              </li>
              <li>
                <a
                  href="#proximos-lancamentos"
                  className="text-textSecondary hover:text-accent transition-colors text-sm"
                >
                  Próximos Lançamentos
                </a>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h3 className="text-textPrimary font-semibold mb-4">Sobre</h3>
            <p className="text-textSecondary text-sm mb-4">
              Dados fornecidos por{' '}
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                TMDb
              </a>
            </p>
            <div className="flex items-center space-x-2 text-textSecondary text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Cinemas em todo o Brasil</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-center text-textSecondary text-sm">
            © {new Date().getFullYear()} CineNow. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
