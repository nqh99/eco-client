/**
 * Safely parses a JSON string into a specified type.
 *
 * @param str - The JSON string to parse.
 * @returns The parsed JSON value of type T, or undefined if parsing fails.
 * @template T - The type of the parsed JSON value.
 */
const safeJsonParse = <T>(str: string) => {
  try {
    const jsonVal: T = JSON.parse(str);
    return jsonVal;
  } catch {
    return undefined;
  }
};

export { safeJsonParse };
