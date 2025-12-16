import type { TextStyle } from 'react-native';

const fonts = {
  hero: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 58,
  },
  heading: {
    fontSize: 38,
    fontWeight: 600,
    lineHeight: 46,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 22,
  },
  body: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
  },
  helper: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
  },
  bold: {
    fontWeight: 700,
  },
  medium: {
    fontWeight: 500,
  },
  regular: {
    fontWeight: 400,
  },
  light: {
    fontWeight: 300,
  },
};

type NornIronFontName = keyof typeof fonts;
export type NornIronFonts = Record<NornIronFontName, TextStyle>;

export const useFonts = () => fonts as NornIronFonts;
