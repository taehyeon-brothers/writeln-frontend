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

export interface TagDetailResponse {
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

export interface DailyDetailResponse {
  dailyId: number;
  userId: number;
  userNickname: string;
  tags: TagDetailResponse[];
}

export interface FeedDailyResponse {
  dailyId: number;
  userId: number;
  userNickname: string;
}

export interface FeedDailyResponses {
  currentPage: number;
  isEnd: boolean;
  dailies: FeedDailyResponse[];
}
