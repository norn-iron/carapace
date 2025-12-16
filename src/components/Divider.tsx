import { styled } from '../providers/ThemeProvider';
import { Flex, type FlexProps } from './Flex';

export type DividerProps = FlexProps;

export const Divider = styled<DividerProps>(Flex, ({ colors }) => ({
  height: 1,
  width: '100%',
  backgroundColor: colors.text.main,
}));
