import { merge } from 'lodash';
import {
  type ComponentType,
  createContext,
  createElement,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { type NornIronMediaBreakpoint, useBreakpoints } from '../theme/breakpoints';
import { type NornIronThemeColors, useColors } from '../theme/colors';
import { type NornIronFonts, useFonts } from '../theme/fonts';
import { type NornIronSpacing, useSpacing } from '../theme/spacing';
import type { DeepPartial } from '../types';

type NornIronTheme = {
  colors: NornIronThemeColors;
  spacing: NornIronSpacing;
  fonts: NornIronFonts;
  breakpoints: Record<NornIronMediaBreakpoint, boolean>;
};

type NornIronThemeContext = {
  theme: NornIronTheme;
};

const Context = createContext<NornIronThemeContext | null>(null);

export const ThemeProvider = ({
  theme: customTheme,
  children,
}: PropsWithChildren & {
  theme?: DeepPartial<NornIronTheme>;
}) => {
  const fonts = useFonts();
  const spacing = useSpacing();
  const colors = useColors();
  const { breakpoints } = useBreakpoints();

  const contextTheme: NornIronTheme = useMemo(() => {
    const nornIronTheme: NornIronTheme = {
      colors,
      fonts,
      spacing,
      breakpoints,
    };

    return merge({}, nornIronTheme, customTheme);
  }, [fonts, spacing, colors, breakpoints, customTheme]);

  return <Context.Provider value={{ theme: contextTheme }}>{children}</Context.Provider>;
};

export const useTheme = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const styled = <
  TProps extends { style?: unknown },
  TStyle extends ViewStyle | TextStyle | ImageStyle,
>(
  Component: ComponentType<TProps>,
  stylesFn: (theme: NornIronTheme) => TStyle
): ComponentType<TProps> => ({ style: propsStyle, ...props }: TProps) => {
  const themeContext = useTheme();

  const style = useMemo(
    () => [stylesFn(themeContext.theme), propsStyle].filter(Boolean),
    [stylesFn, themeContext, propsStyle]
  );

  return createElement(
    Component,
    { style, ...props } as TProps
  );
};
