import { useMemo } from 'react';
import type { TextStyle } from 'react-native';

const base = {
  h1: {
    fontSize: 38,
    fontWeight: 600,
    lineHeight: 46,
  },
  h2: {
    fontSize: 20,
    fontWeight: 600,
    lineHeight: 24,
  },
  h3: {
    fontSize: 18,
    fontWeight: 600,
    lineHeight: 22,
  },
  h4: {
    fontSize: 16,
    fontWeight: 600,
    lineHeight: 19,
  },
  h5: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 17,
  },
  h6: {
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 14,
  },
  p: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
  },
  code: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
  },
};

const named = {
  hero: {
    fontSize: 48,
    fontWeight: 600,
    lineHeight: 58,
  },
  heading: base.h1,
  subHeading: base.h3,
  body: base.p,
  helper: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 21,
  },
};

type NornIronFontName = keyof typeof base | keyof typeof named;
export type NornIronFonts = Record<NornIronFontName, TextStyle>;

export const useFonts = () => useMemo<NornIronFonts>(() => ({ ...base, ...named } as NornIronFonts), []);
