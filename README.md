# @norn-iron/carapace

A React Native component library

### ⬇️ Installation

```bash
pnpm add @norn-iron/carapace
```

```tsx
import { NornIronProvider, useDarkMode } from '@norn-iron/carapace';

export const App = () => (
  // Wrap your app in NornIronProvider
  <NornIronProvider>
    <MyComponent />
  </NornIronProvider>
);

const MyComponent = () => {
  // Access to NornIron components and hooks etc
  const { isDark } = useDarkMode();
}
```

### 🎨 Theming / Styled components

```tsx
import { View, Text } from 'react-native';
import { styled } from '@norn-iron/carapace';

export const MyComponent = () => (
  <Container>
    <Heading>Hello, world!</Heading>
  </Container>
);

const Container = styled(View, ({ spacing, colors }) => ({
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.small,
  backgroundColor: colors.background.main
}));

const Heading = styled(Text, ({ fonts, colors }) => ({
  ...fonts.heading,
  color: colors.text.main
}));
```

### 💻 Dev

```bash
# install dependencies
pnpm install

# serve the docs
pnpm dev

# auto open simulator/web
pnpm dev:ios
pnpm dev:android
pnpm dev:web

# lint, format, typecheck
pnpm sweep
```

## License

UNLICENSED (for now)

---

☘️ Made in Northern Ireland ☘️
