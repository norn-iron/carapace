import { type TextProps, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { styled } from '../providers/ThemeProvider';
import { Spacer } from './Spacer';
import { Text } from './Text';

type MenuItemVariant = 'text' | 'solid' | 'outlined';

export const MenuItem = ({
  variant = 'text',
  ...props
}: {
  label: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onPress?: () => void;
  variant?: MenuItemVariant;
}) => (
  <Touchable variant={variant} onPress={props.onPress}>
    {props.startIcon ?? <Spacer size="none" />}
    <MenuItemText variant={variant}>{props.label}</MenuItemText>
    {props.endIcon ?? <Spacer size="none" />}
  </Touchable>
);

const Touchable = styled<TouchableOpacityProps & { variant: MenuItemVariant }>(
  TouchableOpacity,
  ({ colors, spacing, radius }, { variant }) => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    borderRadius: radius.medium,
    ...(variant === 'solid' && {
      backgroundColor: colors.text.main,
    }),
    ...(variant === 'outlined' && {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.text.main,
    }),
  })
);

const MenuItemText = styled<TextProps & { variant: MenuItemVariant }>(
  Text,
  ({ colors, fonts }, { variant }) => ({
    ...fonts.body,
    color: variant === 'solid' ? colors.background.main : colors.text.main,
  })
);
