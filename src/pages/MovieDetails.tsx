import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useUserCity } from '../hooks/useUserCity';
import { getImageUrl } from '../services/api';
import { formatVoteAverage, formatRuntime, formatDate, getYouTubeEmbedUrl } from '../utils/formatters';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import LocationModal from '../components/LocationModal';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = id ? parseInt(id) : 0;
  const { movie, loading, error } = useMovieDetails(movieId);
  const { userCity } = useUserCity();
  const [showLocationModal, setShowLocationModal] = useState(false);

  const handleShowCinemas = () => {
    setShowLocationModal(true);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (error || !movie) {
    return (
      <ErrorMessage
        message={error || 'Filme não encontrado'}
        onRetry={() => navigate('/')}
      />
    );
  }

  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <div className="min-h-screen">
      {/* Backdrop */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-secondary bg-opacity-90 backdrop-blur-sm p-3 rounded-full hover:bg-accent transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="container-app -mt-32 relative z-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-textSecondary italic text-lg">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center space-x-2 bg-secondary px-4 py-2 rounded-lg">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-xl">{formatVoteAverage(movie.vote_average)}</span>
                </div>

                {movie.runtime && (
                  <span className="text-textSecondary">{formatRuntime(movie.runtime)}</span>
                )}

                {movie.release_date && (
                  <span className="text-textSecondary">{formatDate(movie.release_date)}</span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-secondary px-3 py-1 rounded-full text-sm border border-textSecondary border-opacity-30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Overview */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">Sinopse</h2>
              <p className="text-textSecondary leading-relaxed text-lg">{movie.overview}</p>
            </div>

            {/* CTA Button */}
            <div>
              <button onClick={handleShowCinemas} className="btn-primary text-lg">
                🎟️ Ver horários e cinemas
              </button>
              {userCity && (
                <p className="text-textSecondary text-sm mt-2">
                  Cinemas em {userCity.city} - {userCity.state}
                </p>
              )}
            </div>

            {/* Trailer */}
            {trailer && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
                <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={getYouTubeEmbedUrl(trailer.key)}
                    title={`${movie.title} - Trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        movieTitle={movie.title}
      />
    </div>
  );
};

export default MovieDetails;
