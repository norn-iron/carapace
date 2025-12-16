const spacing = {
  none: 0,
  xxsmall: 4,
  xsmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

export type NornIronSpacing = typeof spacing;
export type NornIronSpacingSize = keyof NornIronSpacing;
export const useSpacing = (): NornIronSpacing => spacing;
