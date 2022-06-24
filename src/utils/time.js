export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * @param {number} milliseconds
 * @returns {object}
 */
export const format = (milliseconds) => {
  const getValue = (unit) => {
    const value = Math.floor(milliseconds / unit);
    milliseconds -= unit * value;
    return value;
  };

  return {
    days: getValue(DAY),
    hours: getValue(HOUR),
    minutes: getValue(MINUTE),
    seconds: getValue(SECOND),
    milliseconds,
  };
};
