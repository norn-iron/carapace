import type { PropsWithChildren } from 'react';
import { DarkModeProvider } from './DarkModeProvider';
import { ThemeProvider } from './ThemeProvider';

export const NornIronProvider = ({ children }: PropsWithChildren) => {
  return <DarkModeProvider><ThemeProvider>{children}</ThemeProvider></DarkModeProvider>;
};
