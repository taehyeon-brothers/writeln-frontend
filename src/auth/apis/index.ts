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
    .post(`${API_URL}/api/v1/login/refresh`, {
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

  return await ky
    .post(`${API_URL}/api/v1/login/google`, {
      json: data,
      credentials: "include",
    })
    .json<TokenResponse>();
}
