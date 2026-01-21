export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: Genre[];
  videos: {
    results: Video[];
  };
  tagline: string;
  original_language: string;
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Cinema {
  id: string;
  name: string;
  website: string;
}

export interface CityData {
  name: string;
  state: string;
  cinemas: Cinema[];
}

export interface UserLocation {
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
}
