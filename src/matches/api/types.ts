export interface MatchResponse {
  matchedUserIds: number[];
  matchedUsersWithTags: Record<string, string[]>;
}

export interface ErrorResponse {
  timestamp: string;
  code: string;
  message: string;
  path: string;
  errors: FieldError[];
}

export interface FieldError {
  field: string;
  value?: unknown;
  reason: string;
}
