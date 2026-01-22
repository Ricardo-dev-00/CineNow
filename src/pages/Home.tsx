import React, { useState, useEffect, useRef } from 'react';
import { useMovies } from '../hooks/useMovies';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const Home: React.FC = () => {
  const { movies, loading, error, loadMore, hasMore } = useMovies();
  const { movies: upcomingMovies, loading: upcomingLoading } = useUpcomingMovies();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Responsivo: número de cards por visualização
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // Mobile: 2 cards
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3); // Tablet: 3 cards
      } else {
        setItemsPerView(5); // Desktop: 5 cards
      }
    };

    handleResize(); // Executar na montagem
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = upcomingMovies.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Autoplay do carrossel
  useEffect(() => {
    if (upcomingMovies.length === 0) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        return next > maxIndex ? 0 : next;
      });
    }, 4000); // Muda a cada 4 segundos

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [upcomingMovies.length, maxIndex]);

  const handlePrev = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  if (loading && movies.length === 0) {
    return <Loader fullScreen />;
  }

  if (error && movies.length === 0) {
    return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  }

  if (movies.length === 0) {
    return (
      <EmptyState
        title="Nenhum filme encontrado"
        description="Não encontramos filmes em cartaz no momento."
      />
    );
  }

  return (
    <div className="container-app py-8">
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Filmes em <span className="text-accent">Cartaz</span>
        </h1>
        <p className="text-textSecondary text-lg">
          Descubra os filmes que estão bombando nos cinemas agora
        </p>
      </div>

      {/* Now Playing Movies Section */}
      <div id="em-cartaz" className="mb-8 scroll-mt-20">
        <h2 className="text-3xl font-bold mb-6">Em Cartaz Agora</h2>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-12 mb-16">
          {loading ? (
            <Loader size="medium" />
          ) : (
            <button onClick={loadMore} className="btn-primary">
              Carregar mais filmes
            </button>
          )}
        </div>
      )}

      {/* Upcoming Movies Section */}
      {upcomingMovies.length > 0 && (
        <div id="proximos-lancamentos" className="mb-16 scroll-mt-20">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">
              Próximos <span className="text-accent">Lançamentos</span>
            </h2>
            <p className="text-textSecondary">
              Fique por dentro dos filmes que chegarão em breve aos cinemas
            </p>
          </div>

          {upcomingLoading && upcomingMovies.length === 0 ? (
            <Loader size="medium" />
          ) : (
            <div className="relative group">
              {/* Botão Anterior */}
              <button
                onClick={handlePrev}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/90 hover:bg-accent text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Carrossel */}
              <div className="overflow-hidden -mx-4 px-4 md:mx-0 md:px-0">
                <div
                  ref={carouselRef}
                  className="flex gap-3 md:gap-6 transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                  }}
                >
                  {upcomingMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="flex-shrink-0"
                      style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * (window.innerWidth < 768 ? 0.75 : 1.5) / itemsPerView}rem)` }}
                    >
                      <MovieCard movie={movie} showFullDate />
                    </div>
                  ))}
                </div>
              </div>

              {/* Botão Próximo */}
              <button
                onClick={handleNext}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-secondary/90 hover:bg-accent text-white p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
                aria-label="Próximo"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Indicadores */}
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
                      setCurrentIndex(index);
                    }}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'w-6 md:w-8 bg-accent' : 'w-1.5 md:w-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ir para página ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
