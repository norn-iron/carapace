import { createContext, type PropsWithChildren, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { useStorage } from '../hooks/useStorage';

export type DarkModeOption = 'system' | 'light' | 'dark';

export type DarkMode = {
  darkMode: DarkModeOption;
  isDark: boolean;
  setDarkMode: (darkMode: DarkModeOption) => void;
};

const DarkModeContext = createContext<DarkMode | null>(null);

export const DarkModeProvider = ({ children }: PropsWithChildren) => {
  const systemDarkMode = useColorScheme();
  const { current: darkMode, update: setDarkMode } = useStorage('darkMode', 'system');
  const isDark = darkMode === 'dark' || (darkMode === 'system' && systemDarkMode === 'dark');

  return (
    <DarkModeContext.Provider
      value={{
        darkMode: darkMode ?? 'system',
        isDark,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = (): DarkMode => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
