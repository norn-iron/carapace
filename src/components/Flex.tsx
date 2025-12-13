import { type FlexStyle, View, type ViewProps } from 'react-native';

type FlexProps = ViewProps & {
  alignItems: FlexStyle['alignItems'];
  justifyContent: FlexStyle['justifyContent'];
};

export const Column = ({ style, justifyContent, alignItems, ...props }: FlexProps) => (
  <View
    style={[{ flex: 1, flexDirection: 'column', justifyContent, alignItems }, style]}
    {...props}
  />
);

export const Row = ({ style, justifyContent, alignItems, ...props }: FlexProps) => (
  <View style={[{ flex: 1, flexDirection: 'row', justifyContent, alignItems }, style]} {...props} />
);
