import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
import type { DarkModeOption } from '../providers/DarkModeProvider';

// How to setup custom storage keys 👇
// -----------------------------
// type StorageShape = {
//   currentUser: {
//     id: string;
//     name: string;
//     email: string;
//   };
// };
//
// declare module "@norn-iron/carapace" {
//   interface NornIronStorage extends StorageShape {}
// }

type NornIronStorageShape = {
  darkMode: DarkModeOption;
};

export interface NornIronStorage extends NornIronStorageShape {}
type NornIronStorageKey = keyof NornIronStorage;

export const useStorage = <Key extends NornIronStorageKey>(
  key: Key,
  defaultValue: NornIronStorage[Key] | null
): {
  current: NornIronStorage[Key] | null;
  update: (v: NornIronStorage[Key]) => Promise<void>;
} => {
  const [current, setCurrent] = useState<NornIronStorage[Key] | null>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const stored = await AsyncStorage.getItem(key);
        setCurrent(stored == null ? defaultValue : JSON.parse(stored));
      } catch (error) {
        console.warn(`Failed to load from AsyncStorage for key "${key}":`, error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  const update = useMemo(
    () => async (value: NornIronStorage[Key]) => {
      setCurrent(value);
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn(`Failed to save to AsyncStorage for key "${key}":`, error);
      }
    },
    [key]
  );

  return {
    current: isLoaded ? current : defaultValue,
    update,
  };
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.warn('Failed to clear AsyncStorage:', error);
  }
};
