import { View, type ViewProps, type ViewStyle } from 'react-native';
import { styled } from '../providers/ThemeProvider';
import type { NornIronSpacingSize } from '../theme/spacing';

export type FlexProps = ViewProps & {
  row?: boolean;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  gap?: NornIronSpacingSize;
  grow?: boolean;
  p?: NornIronSpacingSize;
  pv?: NornIronSpacingSize;
  ph?: NornIronSpacingSize;
};

export const Flex = styled<FlexProps>(
  View,
  ({ spacing }, { row, align, justify, gap, grow, p, pv, ph }) => ({
    display: 'flex',
    flexDirection: row ? 'row' : 'column',
    alignItems: align ?? 'flex-start',
    justifyContent: justify ?? 'flex-start',
    gap: gap ? spacing[gap] : undefined,
    alignSelf: grow ? 'stretch' : undefined,
    flexGrow: grow ? 1 : undefined,
    padding: p ? spacing[p] : undefined,
    paddingVertical: pv ? spacing[pv] : undefined,
    paddingHorizontal: ph ? spacing[ph] : undefined,
  })
);
