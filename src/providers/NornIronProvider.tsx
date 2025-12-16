import type { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';

export type NornIronProviderProps = {
  theme?: ThemeProviderProps;
};

export const NornIronProvider = ({ theme, children }: PropsWithChildren<NornIronProviderProps>) => (
  <SafeAreaProvider>
    <ThemeProvider {...theme}>{children}</ThemeProvider>
  </SafeAreaProvider>
);
