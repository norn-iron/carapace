import { Text as RNText } from 'react-native';
import { styled } from "../providers/ThemeProvider";

export const Text = styled(RNText, ({ fonts }) => ({
  ...fonts.body,
  color: "darkgreen",
}));
