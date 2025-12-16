import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from '../providers/ThemeProvider';
import { Flex, type FlexProps } from './Flex';
import { MenuItem } from './MenuItem';

export const NavigationBar = <Key extends string>(props: {
  active: Key;
  items: {
    key: Key;
    label: string;
    icon?: React.ReactNode;
    onPress?: () => void;
  }[];
}) => {
  const insets = useSafeAreaInsets();
  return (
    <NavBar style={{ paddingBottom: insets.bottom }}>
      {props.items.map(({ key, label, icon, onPress }) => (
        <MenuItem
          key={key}
          variant={props.active === key ? 'solid' : 'text'}
          label={label}
          startIcon={icon}
          onPress={onPress}
        />
      ))}
    </NavBar>
  );
};

const NavBar = styled<FlexProps>(Flex, ({ colors, spacing }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor: colors.background.main,
  paddingHorizontal: spacing.large,
  gap: spacing.medium,
}));
