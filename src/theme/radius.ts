const radius = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 18,
  xlarge: 24,
  full: 9999,
};

export type NornIronRadius = typeof radius;
export type NornIronRadiusSize = keyof NornIronRadius;
export const useRadius = (): NornIronRadius => radius;
