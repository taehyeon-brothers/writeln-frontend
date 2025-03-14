export interface DailyUploadResponse {
  dailyId: number;
}

export interface TagAddRequest {
  tagName: string;
}

export interface AddTagResponse {
  tagId: number;
  tagName: string;
}

export interface TagRemoveRequest {
  tagId: number;
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
