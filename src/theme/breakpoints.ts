import { throttle } from 'lodash';
import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const RESIZE_THROTTLE_MS = 1000 / 60;
const BREAKPOINTS = { mobile: 768, tablet: 1024, desktop: 1280 };

export type NornIronBreakpoints = typeof BREAKPOINTS;
export type NornIronMediaBreakpoint = keyof NornIronBreakpoints;
type ScreenSize = { x: number; y: number; breakpoint: NornIronMediaBreakpoint | null };

const getScreenSize = (breakpoints: NornIronBreakpoints): ScreenSize => {
  const screen = Dimensions.get('window');
  return {
    x: screen.width,
    y: screen.height,
    breakpoint: Object.keys(breakpoints).find(
      (breakpoint) => screen.width < breakpoints[breakpoint as NornIronMediaBreakpoint]
    ) as NornIronMediaBreakpoint | null,
  };
};

export const useBreakpoints = (customBreakpoints?: NornIronBreakpoints) => {
  const breakpoints = customBreakpoints ?? BREAKPOINTS;
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize(breakpoints));
  const [currentBreakpoint, setCurrentBreakpoint] = useState(screenSize.breakpoint);

  useEffect(() => {
    const handleResize = throttle(() => {
      const size = getScreenSize(breakpoints);
      setScreenSize(size);
      if (size.breakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(size.breakpoint);
      }
    }, RESIZE_THROTTLE_MS);
    const listener = Dimensions.addEventListener('change', handleResize);
    return () => listener.remove();
  }, [currentBreakpoint, breakpoints]);

  return Object.fromEntries(
    Object.keys(customBreakpoints ?? BREAKPOINTS).map((breakpoint) => [
      breakpoint,
      currentBreakpoint === breakpoint,
    ])
  ) as Record<NornIronMediaBreakpoint, boolean>;
};
