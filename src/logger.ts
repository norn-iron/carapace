const TAG = "[NornIron]";

const getTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const logger = {
  log: (...optionalParams: Parameters<typeof console.log>) => {
    if (__DEV__) {
      console.log(TAG, getTime(), ...optionalParams);
    }
  },
};
