import { NornIronProvider, Screen, Text, useDarkMode } from '@norn-iron/carapace';
import { NavigationBar } from '../../dist/components/NavigationBar';

export const CarapaceDocs = () => (
  <NornIronProvider>
    <App />
  </NornIronProvider>
);

const App = () => {
  const { darkMode, setDarkMode } = useDarkMode();
  return (
    <>
      <Screen justify="center" align="center">
        <Text>docs/index.tsx</Text>
      </Screen>
      <NavigationBar
        active={darkMode}
        items={[
          { key: 'light', label: 'Light', onPress: () => setDarkMode('light') },
          { key: 'dark', label: 'Dark', onPress: () => setDarkMode('dark') },
          { key: 'system', label: 'System', onPress: () => setDarkMode('system') },
        ]}
      />
    </>
  );
};
