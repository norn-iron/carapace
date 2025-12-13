import { Text as RNText, type TextProps } from 'react-native';

export const Text = ({ children, style, ...props }: TextProps) => (
  <RNText style={[{ color: 'darkgreen' }, style]} {...props}>
    {children}
  </RNText>
);
