import { useState, useEffect } from 'react';
import { moviesService } from '../services/movies';
import { Movie } from '../types';

interface UseUpcomingMoviesReturn {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
}

export const useUpcomingMovies = (): UseUpcomingMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNumber: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await moviesService.getUpcoming(pageNumber);
      
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      
      setHasMore(pageNumber < data.total_pages);
    } catch (err) {
      setError('Não foi possível carregar os próximos lançamentos.');
      console.error('Erro ao buscar próximos lançamentos:', err);
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
