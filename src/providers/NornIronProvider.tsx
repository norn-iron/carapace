import type { PropsWithChildren } from 'react';
import { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';

export type NornIronProviderProps = {
  theme?: ThemeProviderProps;
};

export const NornIronProvider = ({ theme, children }: PropsWithChildren<NornIronProviderProps>) => {
  return <ThemeProvider {...theme}>{children}</ThemeProvider>;
};
