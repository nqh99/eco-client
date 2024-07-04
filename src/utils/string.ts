/**
 * Capitalizes the first letter of each word in a string.
 * @param string - The input string.
 * @returns The input string with the first letter of each word capitalized.
 */
const capitalizeWords = (str: string): string => {
  const words = str.replace(/-/g, " ").split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  const capitalizedJoined = capitalizedWords.join(" ");
  return capitalizedJoined;
}

/**
 * Converts a string to a URL-friendly format.
 *
 * @param string - The string to be converted.
 * @returns The converted URL string.
 */
const convertToURL = (str: string): string => {
  const stringWithHyphens = str.toLocaleLowerCase().replace(/\s+/g, "-");
  const stringWithoutSpecialCharacters = stringWithHyphens
    .replace(/(?<![a-zA-Z])[0-9%]+/g, "")
    .replace(/\-+/g, "-")
    .replace("&", "and");

  const url =
    stringWithoutSpecialCharacters.charAt(0) === "-"
      ? stringWithoutSpecialCharacters.substring(1)
      : stringWithoutSpecialCharacters;

  return url;
}

/**
 * Checks whether a value is a meaningful string.
 *
 * @param val - The value to check.
 * @returns true if the value is a string, false otherwise.
 */
const isString = (val: any): boolean => {
  if (val == null || val == undefined) return false;

  return typeof val === "string" || val instanceof String;
}

export { capitalizeWords, convertToURL, isString };