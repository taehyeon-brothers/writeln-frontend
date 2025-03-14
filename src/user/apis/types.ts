export interface UpdateUserRequest {
  nickname?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  age?: number;
  introduction?: string;
  openChatUrl?: string;
}

export interface UserResponse {
  id: number;
  nickname: string;
  email: string;
  age?: number;
  gender?: "MALE" | "FEMALE" | "OTHER";
  introduction?: string;
  profileImageUrl?: string;
  openChatUrl?: string;
  createdAt: string;
  updatedAt: string;
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
