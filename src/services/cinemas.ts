import { CityData, Cinema } from '../types';
import { searchRealCinemas } from './googlePlaces';

/**
 * Base de dados MOCK de cinemas por cidade
 * Usado como fallback quando a API do Google Places não está disponível
 */
export const cinemasDatabase: Record<string, CityData> = {
  'São Paulo-SP': {
    name: 'São Paulo',
    state: 'SP',
    cinemas: [
      { id: '1', name: 'Cinemark Eldorado', website: 'https://www.cinemark.com.br' },
      { id: '2', name: 'Cinépolis JK Iguatemi', website: 'https://www.cinepolis.com.br' },
      { id: '3', name: 'UCI Jardim Sul', website: 'https://www.ucicinemas.com.br' },
      { id: '4', name: 'Kinoplex Itaim', website: 'https://www.kinoplex.com.br' },
      { id: '5', name: 'Cinesystem Frei Caneca', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Rio de Janeiro-RJ': {
    name: 'Rio de Janeiro',
    state: 'RJ',
    cinemas: [
      { id: '6', name: 'Cinemark Downtown', website: 'https://www.cinemark.com.br' },
      { id: '7', name: 'Kinoplex Tijuca', website: 'https://www.kinoplex.com.br' },
      { id: '8', name: 'UCI New York City Center', website: 'https://www.ucicinemas.com.br' },
      { id: '9', name: 'Estação NET Botafogo', website: 'https://www.estacaonet.com.br' },
      { id: '10', name: 'Cinépolis Barra', website: 'https://www.cinepolis.com.br' },
    ],
  },
  'Belo Horizonte-MG': {
    name: 'Belo Horizonte',
    state: 'MG',
    cinemas: [
      { id: '11', name: 'Cinemark Boulevard', website: 'https://www.cinemark.com.br' },
      { id: '12', name: 'UCI BH Shopping', website: 'https://www.ucicinemas.com.br' },
      { id: '13', name: 'Cineart Pátio Savassi', website: 'https://www.cineart.com.br' },
      { id: '14', name: 'Moviecom Del Rey', website: 'https://www.moviecom.com.br' },
    ],
  },
  'Brasília-DF': {
    name: 'Brasília',
    state: 'DF',
    cinemas: [
      { id: '15', name: 'Cinemark Pier 21', website: 'https://www.cinemark.com.br' },
      { id: '16', name: 'Kinoplex Brasília', website: 'https://www.kinoplex.com.br' },
      { id: '17', name: 'UCI Iguatemi Brasília', website: 'https://www.ucicinemas.com.br' },
      { id: '18', name: 'Cinesystem Pátio Brasil', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Salvador-BA': {
    name: 'Salvador',
    state: 'BA',
    cinemas: [
      { id: '19', name: 'Cinemark Salvador', website: 'https://www.cinemark.com.br' },
      { id: '20', name: 'UCI Paralela', website: 'https://www.ucicinemas.com.br' },
      { id: '21', name: 'Cinépolis Salvador', website: 'https://www.cinepolis.com.br' },
    ],
  },
  'Curitiba-PR': {
    name: 'Curitiba',
    state: 'PR',
    cinemas: [
      { id: '22', name: 'Cinemark Mueller', website: 'https://www.cinemark.com.br' },
      { id: '23', name: 'UCI ParkShoppingBarigui', website: 'https://www.ucicinemas.com.br' },
      { id: '24', name: 'Kinoplex Curitiba', website: 'https://www.kinoplex.com.br' },
    ],
  },
  'Fortaleza-CE': {
    name: 'Fortaleza',
    state: 'CE',
    cinemas: [
      { id: '25', name: 'Cinemark RioMar', website: 'https://www.cinemark.com.br' },
      { id: '26', name: 'UCI Iguatemi Fortaleza', website: 'https://www.ucicinemas.com.br' },
      { id: '27', name: 'Kinoplex North Shopping', website: 'https://www.kinoplex.com.br' },
    ],
  },
  'Porto Alegre-RS': {
    name: 'Porto Alegre',
    state: 'RS',
    cinemas: [
      { id: '28', name: 'Cinemark Bourbon Ipiranga', website: 'https://www.cinemark.com.br' },
      { id: '29', name: 'UCI Praia de Belas', website: 'https://www.ucicinemas.com.br' },
      { id: '30', name: 'GNC Cinemas Iguatemi', website: 'https://www.gnccinemas.com.br' },
    ],
  },
  'São Luís-MA': {
    name: 'São Luís',
    state: 'MA',
    cinemas: [
      { id: '31', name: 'Centerplex Pátio Norte Shopping', website: 'https://www.centerplex.com.br' },
      { id: '32', name: 'Cinépolis São Luís Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '33', name: 'Cinesystem Jaracaty Shopping', website: 'https://www.cinesystem.com.br' },
      { id: '34', name: 'Moviecom Rio Anil Shopping', website: 'https://www.moviecom.com.br' },
      { id: '35', name: 'Centerplex Shopping da Ilha', website: 'https://www.centerplex.com.br' },
    ],
  },
  'Recife-PE': {
    name: 'Recife',
    state: 'PE',
    cinemas: [
      { id: '36', name: 'Cinépolis RioMar Recife', website: 'https://www.cinepolis.com.br' },
      { id: '37', name: 'UCI Plaza Casa Forte', website: 'https://www.ucicinemas.com.br' },
      { id: '38', name: 'Cinemark Recife', website: 'https://www.cinemark.com.br' },
    ],
  },
  'Manaus-AM': {
    name: 'Manaus',
    state: 'AM',
    cinemas: [
      { id: '39', name: 'Cinépolis Manauara Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '40', name: 'Cinesystem Millennium', website: 'https://www.cinesystem.com.br' },
      { id: '41', name: 'Moviecom Ponta Negra', website: 'https://www.moviecom.com.br' },
    ],
  },
  'Belém-PA': {
    name: 'Belém',
    state: 'PA',
    cinemas: [
      { id: '42', name: 'Cinépolis Parque Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '43', name: 'UCI Boulevard', website: 'https://www.ucicinemas.com.br' },
      { id: '44', name: 'Cinesystem Castanheira', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Goiânia-GO': {
    name: 'Goiânia',
    state: 'GO',
    cinemas: [
      { id: '45', name: 'Cinemark Flamboyant', website: 'https://www.cinemark.com.br' },
      { id: '46', name: 'Kinoplex Goiânia Shopping', website: 'https://www.kinoplex.com.br' },
      { id: '47', name: 'Cinesystem Buriti Shopping', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Campinas-SP': {
    name: 'Campinas',
    state: 'SP',
    cinemas: [
      { id: '48', name: 'Cinemark Iguatemi', website: 'https://www.cinemark.com.br' },
      { id: '49', name: 'UCI Galleria', website: 'https://www.ucicinemas.com.br' },
      { id: '50', name: 'Kinoplex Parque Dom Pedro', website: 'https://www.kinoplex.com.br' },
    ],
  },
  'Natal-RN': {
    name: 'Natal',
    state: 'RN',
    cinemas: [
      { id: '51', name: 'Cinépolis Midway Mall', website: 'https://www.cinepolis.com.br' },
      { id: '52', name: 'Cinesystem Natal Shopping', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'João Pessoa-PB': {
    name: 'João Pessoa',
    state: 'PB',
    cinemas: [
      { id: '53', name: 'Cinépolis Manaíra Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '54', name: 'Cinesystem Tambiá', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Teresina-PI': {
    name: 'Teresina',
    state: 'PI',
    cinemas: [
      { id: '55', name: 'Cinépolis Teresina Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '56', name: 'Cinesystem RioPoty Shopping', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Maceió-AL': {
    name: 'Maceió',
    state: 'AL',
    cinemas: [
      { id: '57', name: 'Cinépolis Parque Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '58', name: 'Cinesystem Maceió Shopping', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Aracaju-SE': {
    name: 'Aracaju',
    state: 'SE',
    cinemas: [
      { id: '59', name: 'Cinépolis RioMar', website: 'https://www.cinepolis.com.br' },
      { id: '60', name: 'Cinesystem Jardins', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Florianópolis-SC': {
    name: 'Florianópolis',
    state: 'SC',
    cinemas: [
      { id: '61', name: 'Cinemark Iguatemi', website: 'https://www.cinemark.com.br' },
      { id: '62', name: 'Kinoplex Floripa Shopping', website: 'https://www.kinoplex.com.br' },
      { id: '63', name: 'Cinesystem Beiramar', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Vitória-ES': {
    name: 'Vitória',
    state: 'ES',
    cinemas: [
      { id: '64', name: 'Cinemark Shopping Vitória', website: 'https://www.cinemark.com.br' },
      { id: '65', name: 'Cinesystem Boulevard', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Cuiabá-MT': {
    name: 'Cuiabá',
    state: 'MT',
    cinemas: [
      { id: '66', name: 'Cinépolis Pantanal Shopping', website: 'https://www.cinepolis.com.br' },
      { id: '67', name: 'Cinesystem Goiabeiras', website: 'https://www.cinesystem.com.br' },
    ],
  },
  'Campo Grande-MS': {
    name: 'Campo Grande',
    state: 'MS',
    cinemas: [
      { id: '68', name: 'Cinépolis Norte Sul Plaza', website: 'https://www.cinepolis.com.br' },
      { id: '69', name: 'Cinesystem Bosque dos Ipês', website: 'https://www.cinesystem.com.br' },
    ],
  },
};

export const getCinemasByCity = async (cityKey: string): Promise<CityData | null> => {
  const [city, state] = cityKey.split('-');
  
  // Primeiro tenta buscar cinemas reais via Google Places API
  const realCinemas = await searchRealCinemas(city, state);
  
  if (realCinemas.length > 0) {
    return {
      name: city,
      state: state,
      cinemas: realCinemas,
    };
  }
  
  // Fallback para dados mock se a API falhar
  return cinemasDatabase[cityKey] || null;
};

export const getAllCities = (): string[] => {
  return Object.keys(cinemasDatabase);
};
