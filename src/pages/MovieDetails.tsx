import React, { useState, useEffect } from 'react';
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

  // Atualizar meta tags para Open Graph
  useEffect(() => {
    if (movie) {
      document.title = `${movie.title} - CineNow`;
      
      // Meta tags Open Graph
      const metaTags = [
        { property: 'og:title', content: `${movie.title} - CineNow` },
        { property: 'og:description', content: movie.overview },
        { property: 'og:image', content: getImageUrl(movie.poster_path, 'w780') },
        { property: 'og:url', content: window.location.href },
        { property: 'og:type', content: 'video.movie' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: `${movie.title} - CineNow` },
        { name: 'twitter:description', content: movie.overview },
        { name: 'twitter:image', content: getImageUrl(movie.poster_path, 'w780') },
      ];

      metaTags.forEach(({ property, name, content }) => {
        let meta = document.querySelector(property ? `meta[property="${property}"]` : `meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          if (property) meta.setAttribute('property', property);
          if (name) meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      });
    }

    return () => {
      document.title = 'CineNow - Filmes em Cartaz';
    };
  }, [movie]);

  const handleShowCinemas = () => {
    setShowLocationModal(true);
  };

  const handleWhatsAppShare = () => {
    if (!movie) return;
    
    const releaseInfo = movie.release_date ? `\n📆 Estreia: ${formatDate(movie.release_date)}` : '';
    const rating = `⭐ Nota: ${formatVoteAverage(movie.vote_average)}/10`;
    const message = `🍿 *${movie.title}*${releaseInfo}\n${rating}\n\n${movie.overview.substring(0, 120)}...\n\n🔗 Ver trailer e mais informações:\n${window.location.href}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
    <div className="min-h-screen bg-[#020617]">
      {/* Hero Banner Section */}
      <div className="relative h-[50vh] md:h-[70vh] lg:h-[80vh] mt-16">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/50 to-transparent" />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 bg-secondary/90 backdrop-blur-sm p-3 rounded-full hover:bg-accent hover:scale-110 transition-all z-20 shadow-xl"
          aria-label="Voltar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Banner Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="container-app">
            <div className="max-w-3xl">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-shadow">
                {movie.title}
              </h1>

              {/* Tagline */}
              {movie.tagline && (
                <p className="text-lg md:text-xl text-gray-300 italic mb-6 text-shadow">
                  {movie.tagline}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Rating */}
                <div className="flex items-center space-x-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-yellow-500/30">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-bold text-xl text-yellow-400">{formatVoteAverage(movie.vote_average)}</span>
                </div>

                {/* Runtime */}
                {movie.runtime && (
                  <span className="text-gray-300 font-medium text-lg">{formatRuntime(movie.runtime)}</span>
                )}

                {/* Release Date */}
                {movie.release_date && (
                  <span className="text-gray-300 font-medium text-lg">{new Date(movie.release_date).getFullYear()}</span>
                )}
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-textSecondary/20"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleShowCinemas} 
                  className="bg-accent hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span>Ver Horários e Cinemas</span>
                </button>

                <button 
                  onClick={handleWhatsAppShare}
                  className="bg-[#25D366] hover:bg-[#1fb855] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 flex items-center space-x-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>Compartilhar</span>
                </button>
              </div>

              {/* User City Info */}
              {userCity && (
                <p className="text-gray-400 text-sm mt-4">
                  📍 Cinemas em {userCity.city} - {userCity.state}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-app py-12">
        {/* Trailer Section */}
        {trailer && (
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trailer Oficial</h2>
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-secondary">
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

        {/* Movie Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Poster */}
          <div className="lg:col-span-1">
            <img
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Synopsis */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Sinopse</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>

            {/* Movie Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="text-sm text-textSecondary mb-2">Data de Lançamento</h3>
                <p className="text-xl font-semibold">{formatDate(movie.release_date)}</p>
              </div>

              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="text-sm text-textSecondary mb-2">Duração</h3>
                <p className="text-xl font-semibold">{movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}</p>
              </div>

              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="text-sm text-textSecondary mb-2">Idioma Original</h3>
                <p className="text-xl font-semibold uppercase">{movie.original_language}</p>
              </div>

              <div className="bg-secondary p-6 rounded-xl">
                <h3 className="text-sm text-textSecondary mb-2">Popularidade</h3>
                <p className="text-xl font-semibold">{movie.popularity.toFixed(0)}</p>
              </div>
            </div>
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
