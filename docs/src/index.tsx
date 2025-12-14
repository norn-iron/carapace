import { NornIronProvider, styled, useDarkMode } from '@norn-iron/carapace';
import { Button, Text, View } from 'react-native';

export const CarapaceDocs = () => (
  <NornIronProvider>
    <App />
  </NornIronProvider>
);

const App = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <Screen>
      <Box>
        <BodyText>docs/index.tsx</BodyText>
        <Button
          title={`Light theme ${darkMode === 'light' ? '✅' : ''}`}
          onPress={() => setDarkMode('light')}
        />
        <Button
          title={`Dark theme ${darkMode === 'dark' ? '✅' : ''}`}
          onPress={() => setDarkMode('dark')}
        />
        <Button
          title={`System theme ${darkMode === 'system' ? '✅' : ''}`}
          onPress={() => setDarkMode('system')}
        />
      </Box>
    </Screen>
  );
};

const Screen = styled(View, ({ colors }) => ({
  flex: 1,
  backgroundColor: colors.background.variant,
  justifyContent: 'center',
  alignItems: 'center',
}));

const Box = styled(View, ({ colors, spacing, radius }) => ({
  backgroundColor: colors.background.main,
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.small,
  borderRadius: radius.small,
}));

const BodyText = styled(Text, ({ fonts, colors }) => ({
  ...fonts.body,
  ...fonts.bold,
  color: colors.text.subdued,
}));
