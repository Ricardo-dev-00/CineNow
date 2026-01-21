import { useState, useEffect } from 'react';
import { moviesService } from '../services/movies';
import { Movie } from '../types';

interface UseMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

export const useMovies = (): UseMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await moviesService.getNowPlaying(pageNumber);
      
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      
      setHasMore(pageNumber < data.total_pages);
    } catch (err) {
      setError('Não foi possível carregar os filmes. Verifique sua conexão e tente novamente.');
      console.error('Erro ao buscar filmes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return { movies, loading, error, loadMore, hasMore };
};
