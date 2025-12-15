import { styled } from '../providers/ThemeProvider';
import { Flex, type FlexProps } from './Flex';

export type ButtonGroupProps = Omit<FlexProps, 'row'>;

export const ButtonGroup = styled<ButtonGroupProps>(Flex, () => ({
  flexDirection: 'row',
}));
