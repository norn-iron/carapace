import { View, type ViewProps, type ViewStyle } from 'react-native';
import { styled } from '../providers/ThemeProvider';
import type { NornIronRadiusSize } from '../theme/radius';
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
  pt?: NornIronSpacingSize;
  pb?: NornIronSpacingSize;
  pl?: NornIronSpacingSize;
  pr?: NornIronSpacingSize;
  m?: NornIronSpacingSize;
  mv?: NornIronSpacingSize;
  mh?: NornIronSpacingSize;
  mt?: NornIronSpacingSize;
  mb?: NornIronSpacingSize;
  ml?: NornIronSpacingSize;
  mr?: NornIronSpacingSize;
  r?: NornIronRadiusSize;
};

export const Flex = styled<FlexProps>(
  View,
  (
    { spacing, radius },
    { row, align, justify, gap, grow, p, pv, ph, pt, pb, pl, pr, m, mv, mh, mt, mb, ml, mr, r }
  ) => ({
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
    paddingTop: pt ? spacing[pt] : undefined,
    paddingBottom: pb ? spacing[pb] : undefined,
    paddingLeft: pl ? spacing[pl] : undefined,
    paddingRight: pr ? spacing[pr] : undefined,
    margin: m ? spacing[m] : undefined,
    marginVertical: mv ? spacing[mv] : undefined,
    marginHorizontal: mh ? spacing[mh] : undefined,
    marginTop: mt ? spacing[mt] : undefined,
    marginBottom: mb ? spacing[mb] : undefined,
    marginLeft: ml ? spacing[ml] : undefined,
    marginRight: mr ? spacing[mr] : undefined,
    borderRadius: r ? radius[r] : undefined,
  })
);
