import ErrorType from "@/configs/Errors";
import ResponseMdl from "@/models/https/response";
import { revalidatePath } from "next/cache";

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
};

/**
 * Fetches data from the specified URL, convert it into common response api model and handles error cases.
 *
 * @param url - The URL to fetch the data from.
 * @param T - type of responded data
 * @returns A promise that resolves to the fetched data or an empty `ResponseMdl` object.
 * @throws An error of type `ErrorType.SysErr` if the response is not OK.
 */
const safeDataFetching = async <T>(url: string): Promise<ResponseMdl<T>> => {
  const res = await fetch(url, {
    headers: {
      "ConTent-Type": "application/json",
    },
  });

  revalidatePath(url);

  if (!res.ok) {
    throw new Error(ErrorType.SysErr);
  }

  try {
    const strTrans = await res.text();
    const jsonVal: ResponseMdl<T> = JSON.parse(strTrans);

    return jsonVal;
  } catch {
    return new ResponseMdl();
  }
};

export { convertToURL, safeDataFetching };
