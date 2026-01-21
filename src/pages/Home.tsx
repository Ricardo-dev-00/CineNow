import React from 'react';
import { useMovies } from '../hooks/useMovies';
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';

const Home: React.FC = () => {
  const { movies, loading, error, loadMore, hasMore } = useMovies();
  const { movies: upcomingMovies, loading: upcomingLoading, loadMore: loadMoreUpcoming, hasMore: hasMoreUpcoming } = useUpcomingMovies();

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
            <>
              <div className="relative">
                <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                  <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
                    {upcomingMovies.map((movie) => (
                      <div key={movie.id} className="w-40 sm:w-48 flex-shrink-0">
                      <MovieCard movie={movie} showFullDate />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Load More Button for Upcoming */}
              {hasMoreUpcoming && (
                <div className="flex justify-center mt-8">
                  {upcomingLoading ? (
                    <Loader size="medium" />
                  ) : (
                    <button onClick={loadMoreUpcoming} className="btn-secondary">
                      Ver mais lançamentos
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
