import { StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled, useDarkMode } from '../providers/ThemeProvider';
import { Flex, type FlexProps } from './Flex';

export const Screen = ({
  children,
  safe = true,
  style,
  grow = true,
  ...props
}: FlexProps & { safe?: boolean }) => {
  const insets = useSafeAreaInsets();
  const { isDark } = useDarkMode();

  return (
    <Container grow>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Flex grow={grow} style={[{ paddingTop: safe ? insets.top : 0 }, style]} {...props}>
        {children}
      </Flex>
    </Container>
  );
};

const Container = styled<FlexProps>(Flex, ({ colors }) => ({
  backgroundColor: colors.background.main,
}));
