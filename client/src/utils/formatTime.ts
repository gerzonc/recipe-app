const units = [
  { unit: "year", seconds: 60 * 60 * 24 * 365 },
  { unit: "day", seconds: 60 * 60 * 24 },
  { unit: "hour", seconds: 60 * 60 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

/**
 * Converts a duration in seconds to a human-readable string representation.
 *
 * @param seconds The duration in seconds.
 * @returns A string representation of the duration in units of years, days, hours, minutes, and/or seconds.
 */
export const formatTime = (seconds: number): string => {
  if (seconds < 0) {
    throw new Error("Negative values are not allowed");
  }

  if (typeof seconds !== "number") {
    throw new Error("Wrong data type");
  }

  for (const { unit, seconds: unitSeconds } of units) {
    if (seconds >= unitSeconds) {
      const value = Math.floor(seconds / unitSeconds);
      const plural = value !== 1 ? "s" : "";

      return `${value} ${unit}${plural}`;
    }
  }
  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
};
