/**
 * Type definitions for Auth API
 */

/**
 * Request type for refreshing tokens
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Response type for token operations
 */
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Request type for Google authorization code
 */
export interface AuthorizationCodeRequest {
  code: string;
  redirectUri: string;
}

/**
 * Common error response type
 */
export interface ErrorResponse {
  timestamp: string;
  code: string;
  message: string;
  path: string;
  errors: FieldError[];
}

/**
 * Field error type for validation errors
 */
export interface FieldError {
  field: string;
  value?: unknown;
  reason: string;
}
