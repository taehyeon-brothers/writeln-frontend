"use server";

import { getCurrentUserProfile } from "../apis";
import { checkProfileCompletion } from "../helpers/profile";
import type { UserResponse } from "../apis/types";

export type ProfileCheckResult = {
  isComplete: boolean;
  profile: UserResponse | null;
  error?: string;
};

export async function checkUserProfile(): Promise<ProfileCheckResult> {
  try {
    const profile = await getCurrentUserProfile();
    return {
      isComplete: checkProfileCompletion(profile),
      profile,
    };
  } catch (error) {
    console.error("Error checking user profile:", error);
    return {
      isComplete: false,
      profile: null,
      error: "Failed to check profile status",
    };
  }
}
