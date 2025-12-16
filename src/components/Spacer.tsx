import { styled } from '../providers/ThemeProvider';
import type { NornIronSpacingSize } from '../theme/spacing';
import { Flex, type FlexProps } from './Flex';

type SpacerProps = FlexProps & {
  size: NornIronSpacingSize;
  horizontal?: boolean;
};

export const Spacer = styled<SpacerProps>(Flex, ({ spacing }, { size, horizontal }) => ({
  height: horizontal ? undefined : spacing[size],
  width: horizontal ? spacing[size] : undefined,
}));
