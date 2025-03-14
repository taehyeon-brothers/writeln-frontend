# API Analysis

## Overview

The swagger.json file defines the API for the Match Real service. The API is organized around several domains:

1. **Auth** - Authentication-related endpoints
2. **Daily** - Daily content management
3. **User** - User profile management
4. **Health** - System health check

## Domains and Endpoints

### Auth Domain

- **POST /api/v1/login/refresh** - Refresh authentication tokens
  - Request: `RefreshTokenRequest`
  - Response: `TokenResponse`
- **POST /api/v1/login/google** - Login with Google
  - Request: `AuthorizationCodeRequest`
  - Response: `TokenResponse`

### Daily Domain

- **POST /api/v1/daily** - Upload daily content
  - Request: Multipart form with file
  - Response: `DailyUploadResponse`
- **POST /api/v1/daily/{dailyId}/tag** - Add a tag to a daily
  - Request: `TagAddRequest`
  - Response: `AddTagResponse`
- **GET /api/v1/daily/{dailyId}** - Get a specific daily
  - Response: Binary file
- **DELETE /api/v1/daily/{dailyId}/tag** - Remove a tag from a daily
  - Request: `TagRemoveRequest`
  - Response: `Unit` (empty object)

### User Domain

- **GET /api/v1/users** - Get current user profile
  - Response: `UserResponse`
- **PATCH /api/v1/users** - Update current user profile
  - Request: `UpdateUserRequest`
  - Response: `UserResponse`
- **GET /api/v1/users/{userId}** - Get another user's profile
  - Response: `UserResponse`

## Data Types

### Auth Types

- **RefreshTokenRequest**
  - `refreshToken`: string (required)
- **TokenResponse**
  - `accessToken`: string (required)
  - `refreshToken`: string (required)
- **AuthorizationCodeRequest**
  - `code`: string (required)
  - `redirectUri`: string (required)

### Daily Types

- **DailyUploadResponse**
  - `dailyId`: integer (required)
- **TagAddRequest**
  - `tagName`: string (required)
- **AddTagResponse**
  - `tagId`: integer (required)
  - `tagName`: string (required)
- **TagRemoveRequest**
  - `tagId`: integer (required)

### User Types

- **UpdateUserRequest**
  - `nickname`: string
  - `gender`: string (enum: "MALE", "FEMALE", "OTHER")
  - `age`: integer
  - `introduction`: string
  - `openChatUrl`: string
- **UserResponse**
  - `id`: integer (required)
  - `nickname`: string (required)
  - `email`: string (required)
  - `age`: integer
  - `gender`: string (enum: "MALE", "FEMALE", "OTHER")
  - `introduction`: string
  - `profileImageUrl`: string
  - `openChatUrl`: string
  - `createdAt`: string (date-time) (required)
  - `updatedAt`: string (date-time) (required)

### Common Types

- **ErrorResponse**
  - `timestamp`: string (date-time) (required)
  - `code`: string (required)
  - `message`: string (required)
  - `path`: string (required)
  - `errors`: array of FieldError (required)
- **FieldError**
  - `field`: string (required)
  - `value`: object
  - `reason`: string (required)
- **HealthCheckResponse**
  - `status`: string (required)
  - `message`: string (required)
- **Unit**
  - Empty object

## Security

The API uses JWT Bearer token authentication for protected endpoints.
