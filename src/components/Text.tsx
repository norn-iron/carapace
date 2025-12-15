import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { styled } from '../providers/ThemeProvider';

export type TextProps = RNTextProps;

export const Text = styled(RNText, ({ fonts, colors }) => ({
  ...fonts.body,
  color: colors.text.main,
}));
