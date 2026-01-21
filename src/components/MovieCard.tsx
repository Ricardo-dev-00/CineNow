import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';
import { getImageUrl } from '../services/api';
import { formatVoteAverage } from '../utils/formatters';

interface MovieCardProps {
  movie: Movie;
  showFullDate?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, showFullDate = false }) => {
  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Link to={`/movie/${movie.id}`} className="card group">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Avaliação */}
        <div className="absolute top-2 right-2 bg-primary bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-semibold">{formatVoteAverage(movie.vote_average)}</span>
        </div>

        {/* Overlay no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {movie.title}
        </h3>
        {movie.release_date && (
          <p className="text-textSecondary text-sm mt-1">
            {showFullDate ? formatReleaseDate(movie.release_date) : new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
