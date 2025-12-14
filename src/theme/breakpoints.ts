import { throttle } from "lodash";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const RESIZE_THROTTLE_MS = 1000 / 60;
const BREAKPOINTS = { mobile: 768 };

export type NornIronMediaBreakpoint = keyof typeof BREAKPOINTS;
type ScreenSize = { x: number; y: number; breakpoint: NornIronMediaBreakpoint | null };

const getScreenSize = (): ScreenSize => {
  const screen = Dimensions.get('window');
  return {
    x: screen.width,
    y: screen.height,
    breakpoint: Object.keys(BREAKPOINTS).find(
      (breakpoint) => screen.width < BREAKPOINTS[breakpoint as NornIronMediaBreakpoint]
    ) as NornIronMediaBreakpoint | null,
  };
};

export type NornIronBreakpoints = Record<NornIronMediaBreakpoint, boolean>;

export const useBreakpoints = (): NornIronBreakpoints => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());
  const [currentBreakpoint, setCurrentBreakpoint] = useState(screenSize.breakpoint);

  useEffect(() => {
    const handleResize = throttle(() => {
      const size = getScreenSize();
      setScreenSize(size);
      if (size.breakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(size.breakpoint);
      }
    }, RESIZE_THROTTLE_MS);
    const listener = Dimensions.addEventListener("change", handleResize);
    return () => listener.remove();
  }, [currentBreakpoint]);

  return Object.fromEntries(
      Object.keys(BREAKPOINTS).map((breakpoint) => [breakpoint, currentBreakpoint === breakpoint])
    ) as Record<NornIronMediaBreakpoint, boolean>};
