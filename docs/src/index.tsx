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
import type { NornIronProviderProps } from '../../dist/providers/NornIronProvider';

const USE_CUSTOM_THEME = false;

const customTheme: NornIronProviderProps['theme'] = {
  colors: {
    light: { background: { main: '#6b9c3d' }, text: { main: '#1a3009' } },
    dark: { background: { main: '#1a3009' }, text: { main: '#6b9c3d' } },
  },
};

export const CarapaceDocs = () => (
  <NornIronProvider theme={USE_CUSTOM_THEME ? customTheme : undefined}>
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
