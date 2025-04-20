import client from "../../base/apis/http-client";
import type { UpdateUserRequest, UserResponse } from "./types";

/**
 * Get the current user's profile
 * @param accessToken - Optional access token to use instead of cookies
 * @returns Promise with the user profile
 */
export async function getCurrentUserProfile(): Promise<UserResponse> {
  return await client.get("users/me").json<UserResponse>();
}

/**
 * Update the current user's profile
 * @param data - The user profile data to update
 * @returns Promise with the updated user profile
 */
export async function updateUserProfile(
  data: UpdateUserRequest
): Promise<UserResponse> {
  return await client.patch("users", { json: data }).json<UserResponse>();
}

/**
 * Get another user's profile by ID
 * @param userId - The ID of the user to get
 * @returns Promise with the user profile
 */
export async function getUserProfileById(
  userId: number
): Promise<UserResponse> {
  return await client.get(`users/${userId}`).json<UserResponse>();
}
