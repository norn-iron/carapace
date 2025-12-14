import { View as RNView } from 'react-native';
import { styled } from '../providers/ThemeProvider';

export const View = styled(RNView, () => ({
  flex: 1,
  flexDirection: 'column',
}));
