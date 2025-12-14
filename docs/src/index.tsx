import { NornIronProvider, styled, Text, View } from '@norn-iron/carapace';

export const CarapaceDocs = () => (
  <NornIronProvider>
    <App />
  </NornIronProvider>
)

const App = () => (
  <Container>
    <Text>docs/index.tsx</Text>
  </Container>
);

const Container = styled(View, ({ colors }) => ({
  backgroundColor: colors.background.main,
  justifyContent: 'center',
  alignItems: 'center',
}));
