import axios from 'axios';
import { Cinema } from '../types';

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

interface PlaceResult {
  place_id: string;
  name: string;
  formatted_address?: string;
  website?: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

interface PlacesResponse {
  results: PlaceResult[];
  status: string;
}

/**
 * Busca cinemas reais usando Google Places API
 */
export const searchRealCinemas = async (city: string, state: string): Promise<Cinema[]> => {
  if (!GOOGLE_API_KEY) {
    console.warn('Google Places API Key não configurada. Usando dados mock.');
    return [];
  }

  try {
    const query = `cinema em ${city}, ${state}, Brasil`;
    
    // Text Search API
    const response = await axios.get<PlacesResponse>(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query,
          key: GOOGLE_API_KEY,
          language: 'pt-BR',
        },
      }
    );

    if (response.data.status !== 'OK') {
      console.warn('Erro ao buscar cinemas:', response.data.status);
      return [];
    }

    // Converter resultados para formato Cinema
    const cinemas: Cinema[] = response.data.results.map((place) => ({
      id: place.place_id,
      name: place.name,
      website: place.website || 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.name),
    }));

    return cinemas;
  } catch (error) {
    console.error('Erro ao buscar cinemas reais:', error);
    return [];
  }
};
