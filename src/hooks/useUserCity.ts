import { useState, useCallback } from 'react';
import { UserLocation } from '../types';
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage, STORAGE_KEYS } from '../utils/storage';

interface UseUserCityReturn {
  userCity: UserLocation | null;
  setUserCity: (city: UserLocation) => void;
  clearUserCity: () => void;
}

export const useUserCity = (): UseUserCityReturn => {
  const [userCity, setUserCityState] = useState<UserLocation | null>(() => {
    return getFromLocalStorage<UserLocation>(STORAGE_KEYS.USER_CITY);
  });

  const setUserCity = useCallback((city: UserLocation) => {
    setUserCityState(city);
    saveToLocalStorage(STORAGE_KEYS.USER_CITY, city);
  }, []);

  const clearUserCity = useCallback(() => {
    setUserCityState(null);
    removeFromLocalStorage(STORAGE_KEYS.USER_CITY);
  }, []);

  return { userCity, setUserCity, clearUserCity };
};
