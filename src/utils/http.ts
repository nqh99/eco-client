import { isCustomError } from "@/models/errors/custom-err";
import { ServiceError } from "@/models/errors/service-err";
import ResponseMdl from "@/models/https/response";
import { revalidatePath } from "next/cache";
import { generateReadableErr } from "./core";
import { ClientError } from "@/models/errors/client-err";

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
 * Fetches data from the specified URL, convert it into specific response model (T type) and handles error cases.
 *
 * @param url - The URL to fetch the data from.
 * @param T - type of responded data
 * @returns A promise that resolves to the fetched data or an empty `ResponseMdl` object.
 */
const safeDataFetching = async <T>(
  url: string,
  needRevalidate?: boolean
): Promise<T | undefined> => {
  if (needRevalidate) {
    revalidatePath(url);
  }
  const ret: ResponseMdl<T> = await fetch(url, {
    headers: {
      "ConTent-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw generateReadableErr(res.status, {
          msg: res.statusText,
          info: res.text,
        });
      }
      return res.text();
    })
    .then((data) => JSON.parse(data))
    .catch((err: Error) => {
      throw new ClientError(err.cause as string, err.stack);
    });

  if (!isResOK(ret.httpStatus || "")) {
    throw generateReadableErr(parseInt(ret.httpStatus ?? ""), {
      msg: ret.message,
      info: ret.data,
    });
  }

  return ret.data;
};

/**
 * Checks if the HTTP response status is OK (200).
 *
 * @param response - The HTTP response object.
 * @returns True if the response status is OK, false otherwise.
 */
const isResOK = (res: string | number): boolean => {
  return res >= "200" && res < "300";
};

export { convertToURL, safeDataFetching, isResOK };
