import type { PropsWithChildren } from 'react';
import { ThemeProvider } from './ThemeProvider';

export const NornIronProvider = ({ children }: PropsWithChildren) => {
  return <ThemeProvider>{children}</ThemeProvider>
};
