import ky from "ky";
import type {
  RefreshTokenRequest,
  TokenResponse,
  AuthorizationCodeRequest,
} from "./types";

// Use the environment variable for the API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Refresh authentication tokens
 * @param refreshToken - The refresh token to use
 * @returns Promise with the new access and refresh tokens
 */
export async function refresh(refreshToken: string): Promise<TokenResponse> {
  const data: RefreshTokenRequest = { refreshToken };

  return await ky
    .post(`${API_URL}/login/refresh`, {
      json: data,
      credentials: "include",
    })
    .json<TokenResponse>();
}

/**
 * Login with Google authorization code
 * @param code - The authorization code from Google
 * @param redirectUri - The redirect URI used in the OAuth flow
 * @returns Promise with the access and refresh tokens
 */
export async function loginWithGoogle(
  code: string,
  redirectUri: string
): Promise<TokenResponse> {
  const data: AuthorizationCodeRequest = { code, redirectUri };

  // HACK: use fetch to avoid the issue of ky not working in development mode on edge runtime
  // related issues:
  // https://github.com/vercel/next.js/issues/41531
  // https://github.com/vercel/next.js/issues/57905
  // if (process.env.NODE_ENV === "development") {
  const response = await fetch(`${API_URL}/login/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
  // }

  // const response = await ky.post(`${API_URL}/login/google`, {
  //   body: JSON.stringify(data),
  // });
  // return response.json<TokenResponse>();
}
