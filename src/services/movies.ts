import { tmdbApi } from './api';
import { MoviesResponse, MovieDetails } from '../types';

export const moviesService = {
  getNowPlaying: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>('/movie/now_playing', {
      params: { page, region: 'BR' },
    });
    return response.data;
  },

  getUpcoming: async (page: number = 1): Promise<MoviesResponse> => {
    const response = await tmdbApi.get<MoviesResponse>('/movie/upcoming', {
      params: { page, region: 'BR' },
    });
    return response.data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const response = await tmdbApi.get<MovieDetails>(`/movie/${movieId}`, {
      params: { append_to_response: 'videos' },
    });
    return response.data;
  },
};
