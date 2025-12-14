import { merge } from 'lodash';
import {
  type ComponentType,
  createContext,
  createElement,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { type NornIronMediaBreakpoint, useBreakpoints } from '../theme/breakpoints';
import { type NornIronThemeColors, useColors } from '../theme/colors';
import { type NornIronFonts, useFonts } from '../theme/fonts';
import { type NornIronRadius, useRadius } from '../theme/radius';
import { type NornIronSpacing, useSpacing } from '../theme/spacing';
import type { DeepPartial } from '../types';
import { useDarkMode } from './DarkModeProvider';

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

const ThemeContext = createContext<NornIronThemeContext | null>(null);

export const ThemeProvider = ({
  theme: customTheme,
  children,
}: PropsWithChildren & {
  theme?: DeepPartial<NornIronTheme>;
}) => {
  const fonts = useFonts();
  const spacing = useSpacing();
  const darkMode = useDarkMode();
  useEffect(() => {
    console.log('🌓 changed in here', darkMode);
  }, [darkMode]);
  const colors = useColors(darkMode.isDark);
  const radius = useRadius();
  const breakpoints = useBreakpoints();

  const contextTheme: NornIronTheme = useMemo(() => {
    const nornIronTheme: NornIronTheme = {
      colors,
      fonts,
      spacing,
      breakpoints,
      radius,
    };

    console.log('🌓 contextTheme render', { colors, fonts, spacing, breakpoints, radius });

    return merge({}, nornIronTheme, customTheme);
  }, [fonts, spacing, colors, radius, breakpoints, customTheme]);

  return <ThemeContext.Provider value={{ theme: contextTheme }}>{children}</ThemeContext.Provider>;
};

export const styled =
  <TProps extends { style?: unknown }, TStyle extends ViewStyle | TextStyle | ImageStyle>(
    Component: ComponentType<TProps>,
    stylesFn: (theme: NornIronTheme) => TStyle
  ): ComponentType<TProps> =>
  ({ style: propsStyle, ...rest }: TProps) => {
    const context = useContext(ThemeContext);
    if (context == null) {
      throw new Error('styled must be used within a ThemeProvider');
    }

    const style = useMemo(
      () => [stylesFn(context.theme), propsStyle].filter(Boolean),
      [stylesFn, context, propsStyle]
    );

    return createElement(Component, { style, ...rest } as TProps);
  };
