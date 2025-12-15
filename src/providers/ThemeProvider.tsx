import { merge } from 'lodash';
import {
  type ComponentType,
  createContext,
  createElement,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import {
  type ImageStyle,
  type StyleProp,
  type TextStyle,
  useColorScheme,
  type ViewStyle,
} from 'react-native';
import { useStorage } from '../hooks/useStorage';
import { type NornIronMediaBreakpoint, useBreakpoints } from '../theme/breakpoints';
import { colors, type NornIronThemeColors } from '../theme/colors';
import { type NornIronFonts, useFonts } from '../theme/fonts';
import { type NornIronRadius, useRadius } from '../theme/radius';
import { type NornIronSpacing, useSpacing } from '../theme/spacing';
import type { DeepPartial } from '../types';

type NornIronTheme = {
  colors: NornIronThemeColors;
  spacing: NornIronSpacing;
  fonts: NornIronFonts;
  radius: NornIronRadius;
  breakpoints: Record<NornIronMediaBreakpoint, boolean>;
};

type NornIronThemeContext = {
  theme: NornIronTheme;
};

export type DarkModeOption = 'system' | 'light' | 'dark';

type DarkMode = {
  darkMode: DarkModeOption;
  isDark: boolean;
  setDarkMode: (darkMode: DarkModeOption) => void;
};

const DarkModeContext = createContext<DarkMode | null>(null);
const ThemeContext = createContext<NornIronThemeContext | null>(null);

type ThemeProviderProps = PropsWithChildren & {
  theme?: DeepPartial<NornIronTheme>;
};

export const ThemeProvider = (props: ThemeProviderProps) => (
  <DarkModeProvider>
    <InnerThemeProvider {...props} />
  </DarkModeProvider>
);

export const useDarkMode = (): DarkMode => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

// Helper type to extract props from ComponentType
type ExtractComponentProps<T> = T extends ComponentType<infer P> ? P : never;

// Overload 1: Explicit type parameter provided
export function styled<TProps extends { style?: StyleProp<ViewStyle | TextStyle | ImageStyle> }>(
  Component: ComponentType<Partial<TProps> & { style?: StyleProp<ViewStyle | TextStyle | ImageStyle> }>,
  stylesFn: (theme: NornIronTheme, props: TProps) => ViewStyle | TextStyle | ImageStyle
): ComponentType<TProps>;

// Overload 2: Infer type from Component
export function styled<TComponent extends ComponentType<Record<string, unknown>>>(
  Component: TComponent,
  stylesFn: (theme: NornIronTheme, props: ExtractComponentProps<TComponent>) => ViewStyle | TextStyle | ImageStyle
): ComponentType<ExtractComponentProps<TComponent>>;

// Implementation
export function styled<TProps extends { style?: StyleProp<ViewStyle | TextStyle | ImageStyle> }>(
  Component: ComponentType<Record<string, unknown>>,
  stylesFn: (theme: NornIronTheme, props: TProps) => ViewStyle | TextStyle | ImageStyle
): ComponentType<TProps> {
  return (props: TProps) => {
    const context = useContext(ThemeContext);
    if (context == null) {
      throw new Error('styled must be used within a ThemeProvider');
    }

    const style = [stylesFn(context.theme, props), props.style].filter(Boolean);

    return createElement(Component, { ...props, style });
  };
}

const DarkModeProvider = ({ children }: PropsWithChildren) => {
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

const InnerThemeProvider = ({ theme: customTheme, children }: ThemeProviderProps) => {
  const { isDark } = useDarkMode();
  const fonts = useFonts();
  const spacing = useSpacing();
  const radius = useRadius();
  const breakpoints = useBreakpoints();

  const contextTheme: NornIronTheme = useMemo(() => {
    const nornIronTheme: NornIronTheme = {
      colors: colors[isDark ? 'dark' : 'light'],
      fonts,
      spacing,
      breakpoints,
      radius,
    };

    return merge({}, nornIronTheme, customTheme);
  }, [fonts, spacing, isDark, radius, breakpoints, customTheme]);

  return <ThemeContext.Provider value={{ theme: contextTheme }}>{children}</ThemeContext.Provider>;
};
