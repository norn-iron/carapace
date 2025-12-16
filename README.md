# @norn-iron/carapace

A React Native component library

### ⬇️ Installation

```bash
pnpm add @norn-iron/carapace
```

```tsx
import { NornIronProvider, useDarkMode, Flex, Text } from '@norn-iron/carapace';

export const App = () => (
  // Wrap your app in the NornIronProvider
  <NornIronProvider
    // Optionally provide your own theme for tweaking colors/sizes etc
    theme={customTheme}
  >
    <YourNextApp />
  </NornIronProvider>
);

const YourNextApp = () => {
  // Access to NornIron hooks
  const { isDark } = useDarkMode();

  // Access to NornIron components
  return (
    <Flex>
      <Text>Hello, world!</Text>
    </Flex>
  )
}
```

### 🎨 Styled components

```tsx
import { styled, Flex, Text, type FlexProps } from '@norn-iron/carapace';

export const MyComponent = () => (
  <Container variant="bordered">
    <Text>Hello, world!</Text>
  </Container>
);

type ContainerProps = FlexProps & {
  variant?: "default" | "bordered"
}

const Container = styled<ContainerProps>(Flex, (theme, props) => ({
  paddingHorizontal: theme.spacing.medium,
  paddingVertical: theme.spacing.small,
  backgroundColor: theme.colors.background.main,
  borderWidth: props.variant === "bordered" ? 1 : 0
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
