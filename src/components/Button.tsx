import { Text, type TextProps, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { styled } from '../providers/ThemeProvider';

type ButtonVariant = 'solid' | 'outlined' | 'text';

export type ButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  variant?: ButtonVariant;
  grow?: boolean;
};

export const Button = ({ children, variant = 'solid', grow = false, ...props }: ButtonProps) => (
  <Touchable variant={variant} grow={grow} {...props}>
    <ButtonText variant={variant}>{children}</ButtonText>
  </Touchable>
);

const Touchable = styled<ButtonProps>(
  TouchableOpacity,
  ({ colors, spacing, radius }, { variant, grow }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: grow ? 'stretch' : undefined,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: radius.medium,
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.text.main,
    }),
    ...(variant === 'text' && {
      backgroundColor: 'transparent',
    }),
    ...(variant === 'solid' && {
      backgroundColor: colors.text.main,
    }),
  })
);

const ButtonText = styled<TextProps & { variant?: ButtonVariant }>(
  Text,
  ({ colors, fonts }, { variant }) => ({
    ...fonts.body,
    color: variant === 'solid' ? colors.background.main : colors.text.main,
  })
);
