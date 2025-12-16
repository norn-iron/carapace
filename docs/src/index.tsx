import {
  Button,
  Divider,
  Flex,
  NornIronProvider,
  styled,
  Text,
  useDarkMode,
} from '@norn-iron/carapace';
import type { FlexProps } from '../../dist/components/Flex';

export const CarapaceDocs = () => (
  <NornIronProvider>
    <App />
  </NornIronProvider>
);

const App = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <Screen>
      <Container>
        <Text>docs/index.tsx</Text>
        <Divider mb="xxsmall" />
        <Button
          grow
          onPress={() => setDarkMode('light')}
          variant={darkMode === 'light' ? 'solid' : 'outlined'}
        >
          Light
        </Button>
        <Button
          grow
          onPress={() => setDarkMode('dark')}
          variant={darkMode === 'dark' ? 'solid' : 'outlined'}
        >
          Dark
        </Button>
        <Button
          grow
          onPress={() => setDarkMode('system')}
          variant={darkMode === 'system' ? 'solid' : 'outlined'}
        >
          System
        </Button>
      </Container>
    </Screen>
  );
};

const Screen = styled<FlexProps>(Flex, ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background.main,
  justifyContent: 'center',
  alignItems: 'center',
}));

const Container = styled<FlexProps>(Flex, ({ colors, spacing }) => ({
  maxWidth: 1000,
  width: '100%',
  backgroundColor: colors.background.main,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.small,
  gap: spacing.small,
}));
