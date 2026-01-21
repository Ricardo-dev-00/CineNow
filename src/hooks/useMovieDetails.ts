import { useState, useEffect } from 'react';
import { moviesService } from '../services/movies';
import { MovieDetails } from '../types';

interface UseMovieDetailsReturn {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
}

export const useMovieDetails = (movieId: number): UseMovieDetailsReturn => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await moviesService.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Não foi possível carregar os detalhes do filme. Tente novamente.');
        console.error('Erro ao buscar detalhes do filme:', err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { movie, loading, error };
};
