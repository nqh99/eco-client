import ResponseMdl from '@/models/https/response';
import { revalidatePath } from 'next/cache';
import { refresh } from '@/apis/auth';
import { AppDispatch } from '@/lib/store';
import { authSlice, AuthState } from '@/lib/features/auth/authSlice';

import { Response } from '@/models/Response';
import { LoginResponse } from '@/models/auth/LoginResponse';

/**
 * Converts a string to a URL-friendly format.
 *
 * @returns The converted URL string.
 * @param str
 */
const convertToURL = (str: string): string => {
  const stringWithHyphens = str.toLocaleLowerCase().replace(/\s+/g, '-');
  const stringWithoutSpecialCharacters = stringWithHyphens
    .replace(/(?<![a-zA-Z])[0-9%]+/g, '')
    .replace(/-+/g, '-')
    .replace('&', 'and');

  const url =
    stringWithoutSpecialCharacters.charAt(0) === '-'
      ? stringWithoutSpecialCharacters.substring(1)
      : stringWithoutSpecialCharacters;

  return url;
};

/**
 * Fetches data from the specified URL, convert it into specific response model (T type) and handles error cases.
 *
 * @param url - The URL to fetch the data from.
 * @param needRevalidate
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
      'ConTent-Type': 'application/json',
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        // TODO:
      }
      return res.text();
    })
    .then((data) => JSON.parse(data))
    .catch((err: Error) => {
      // TODO
    });

  if (!isResOK(ret.status)) {
    // TODO
  }

  return ret.data;
};

/**
 * Checks if the HTTP response status is OK (200).
 *
 * @returns True if the response status is OK, false otherwise.
 * @param res
 */
const isResOK = (res: number): boolean => {
  return res >= 200 && res < 300;
};

/**
 * Sends a POST request to the specified URL with the provided data, convert the response into specific response model (T type) and handles error cases.
 *
 * @param url - The URL to send the request to.
 * @param data - The data to send in the request body.
 * @returns A promise that resolves to the response data or an empty `ResponseMdl` object.
 */
const safePostRequest = async <T, D extends Record<string, unknown>>(
  url: string,
  data: D
): Promise<T | undefined> => {
  const ret: ResponseMdl<T> = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (!res.ok) {
        // TODO
      }
      return res.text();
    })
    .then((responseData) => JSON.parse(responseData))
    .catch((err: Error) => {
      // TODO
    });

  if (!isResOK(ret.status)) {
    // TODO
  }

  return ret.data;
};

export const sendRequest = async <D, T, E>(
  url: string,
  data: D,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
  cache: RequestCache = 'no-cache',
  needRevalidate: boolean = false
) => {
  if (needRevalidate) {
    revalidatePath(url);
  }
  const res = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    cache: cache,
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const bodyRaw = await res.text();
  const body = !bodyRaw ? undefined : bodyRaw;

  if (res.ok) {
    return {
      data: body ? (JSON.parse(body) as T) : undefined,
      status: res.status,
      ok: true,
    } as Response<T | undefined>;
  } else {
    return {
      data: body ? (JSON.parse(body) as E) : undefined,
      status: res.status,
      ok: false,
    } as Response<E | undefined>;
  }
};

export const sendAuthenticatedRequest = async <D, T, E>(
  url: string,
  data: D,
  authState: AuthState,
  dispatch: AppDispatch,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'POST',
  cache: RequestCache = 'no-cache',
  needRevalidate: boolean = false
) => {
  const now = new Date();
  const authenticated =
    authState.accessTokenExpiry && new Date(authState.accessTokenExpiry) > now;
  const canRefresh =
    authState.refreshTokenExpiry &&
    new Date(authState.refreshTokenExpiry) > now;
  if (!authenticated && canRefresh) {
    const res = await refresh();
    if (!res.ok) {
      return res as Response<E>;
    }
    dispatch(authSlice.actions.authenticate(res.data as LoginResponse));
  }
  return await sendRequest<D, T, E>(url, data, method, cache, needRevalidate);
};

export { convertToURL, safeDataFetching, isResOK, safePostRequest };
