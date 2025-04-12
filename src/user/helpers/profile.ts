import type { UserResponse } from "../apis/types";

/**
 * Check if the user's profile is complete
 * @param profile - The user's profile to check
 * @returns true if all required fields are filled, false otherwise
 */
export function checkProfileCompletion(profile: UserResponse): boolean {
  return !(
    profile.age === null ||
    profile.gender === null ||
    profile.introduction === null ||
    profile.openChatUrl === null
  );
}
