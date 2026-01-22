import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useUserCity } from '../hooks/useUserCity';
import { getCinemasByCity, getAllCities } from '../services/cinemas';
import { Cinema } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, movieTitle }) => {
  const { userCity, setUserCity } = useUserCity();
  const [step, setStep] = useState<'select' | 'confirm' | 'cinemas'>('select');
  const [selectedCity, setSelectedCity] = useState('');
  const [detectedCity, setDetectedCity] = useState('');
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && userCity) {
      // Se já tem cidade salva, vai direto para os cinemas
      loadCinemas(`${userCity.city}-${userCity.state}`);
    } else if (isOpen) {
      setStep('select');
    }
  }, [isOpen, userCity]);

  const loadCinemas = async (cityKey: string) => {
    setLoading(true);
    const cityData = await getCinemasByCity(cityKey);
    setLoading(false);
    
    if (cityData) {
      setCinemas(cityData.cinemas);
      setStep('cinemas');
      setError('');
    } else {
      setError('Desculpe, não encontramos cinemas para esta cidade.');
      setCinemas([]);
    }
  };

  const handleUseGeolocation = async () => {
    if (!navigator.geolocation) {
      setError('Seu navegador não suporta geolocalização.');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (_position) => {
        try {
          // Em produção, usaria uma API de geocoding reverso
          // Por ora, vamos simular detectando uma cidade padrão
          const mockCity = 'São Paulo-SP';
          setDetectedCity(mockCity);
          setStep('confirm');
        } catch (err) {
          setError('Não foi possível detectar sua localização. Por favor, escolha manualmente.');
          setStep('select');
        } finally {
          setLoading(false);
        }
      },
      (_err) => {
        setError('Não foi possível acessar sua localização. Por favor, escolha manualmente.');
        setLoading(false);
      }
    );
  };

  const handleConfirmCity = () => {
    const [city, state] = detectedCity.split('-');
    setUserCity({ city, state });
    loadCinemas(detectedCity);
  };

  const handleManualSelect = () => {
    if (!selectedCity) {
      setError('Por favor, selecione uma cidade.');
      return;
    }
    const [city, state] = selectedCity.split('-');
    setUserCity({ city, state });
    loadCinemas(selectedCity);
  };

  const handleChangeCity = () => {
    setStep('select');
    setSelectedCity('');
    setDetectedCity('');
    setCinemas([]);
  };

  const cities = getAllCities();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Encontrar Cinemas">
      {/* Step 1: Select Method */}
      {step === 'select' && (
        <div className="space-y-6">
          <p className="text-textSecondary">
            Para encontrar os cinemas mais próximos e ver os horários de <strong>{movieTitle}</strong>,
            precisamos saber sua localização.
          </p>

          <div className="space-y-4">
            <button
              onClick={handleUseGeolocation}
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{loading ? 'Detectando...' : 'Usar minha localização'}</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-textSecondary border-opacity-30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-secondary text-textSecondary">ou</span>
              </div>
            </div>

            <div>
              <label htmlFor="city-select" className="block text-sm font-medium mb-2">
                Escolher cidade manualmente
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-primary border border-textSecondary border-opacity-30 rounded-lg px-4 py-3 focus:outline-none focus:border-accent transition-colors"
              >
                <option value="">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city.replace('-', ' - ')}
                  </option>
                ))}
              </select>
            </div>

            <button onClick={handleManualSelect} className="w-full btn-secondary">
              Continuar
            </button>
          </div>

          {error && (
            <div className="bg-accent bg-opacity-10 border border-accent rounded-lg p-4">
              <p className="text-accent text-sm">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Confirm Detected City */}
      {step === 'confirm' && (
        <div className="space-y-6">
          <div className="bg-secondary border border-accent border-opacity-30 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-accent mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-textSecondary mb-2">Detectamos que você está em:</p>
            <p className="text-2xl font-bold">{detectedCity.replace('-', ' - ')}</p>
          </div>

          <p className="text-textSecondary text-center">Está correto?</p>

          <div className="flex gap-4">
            <button onClick={() => setStep('select')} className="flex-1 btn-secondary">
              Não, escolher outra
            </button>
            <button onClick={handleConfirmCity} className="flex-1 btn-primary">
              Sim, continuar
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Show Cinemas */}
      {step === 'cinemas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm">Cinemas em</p>
              <p className="text-xl font-semibold">
                {userCity?.city} - {userCity?.state}
              </p>
            </div>
            <button
              onClick={handleChangeCity}
              className="text-accent hover:text-red-700 text-sm font-medium transition-colors"
            >
              Trocar cidade
            </button>
          </div>

          {cinemas.length > 0 ? (
            <div className="space-y-3">
              {cinemas.map((cinema) => (
                <a
                  key={cinema.id}
                  href={cinema.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-primary border border-textSecondary border-opacity-20 rounded-lg p-4 hover:border-accent hover:bg-secondary transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <h3 className="font-semibold group-hover:text-accent transition-colors">
                        {cinema.name}
                      </h3>
                      <p className="text-textSecondary text-sm mt-1">
                        {cinema.website.includes('google.com/maps') 
                          ? 'Ver no Google Maps' 
                          : 'Clique para ver horários e comprar ingressos'}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 text-textSecondary group-hover:text-accent transition-colors flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-textSecondary">{error || 'Nenhum cinema encontrado.'}</p>
            </div>
          )}

          <div className="bg-secondary border border-textSecondary border-opacity-20 rounded-lg p-4">
            <p className="text-textSecondary text-sm">
              ℹ️ Cinemas encontrados via Google Places. Os horários e ingressos são consultados nos sites oficiais.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default LocationModal;
