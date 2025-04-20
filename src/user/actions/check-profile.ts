"use server";

import { getCurrentUserProfile } from "../apis";
import { checkProfileCompletion } from "../helpers/profile";
import { redirect } from "next/navigation";

const PUBLIC_PATHS = ["/sign-in", "/profile/edit"];

export type ProfileCheckResult = {
  isComplete: boolean;
  error?: string;
};

export async function checkUserProfile(
  currentPath: string
): Promise<ProfileCheckResult> {
  // Skip check for public routes
  if (PUBLIC_PATHS.includes(currentPath)) {
    return { isComplete: true };
  }

  try {
    const profile = await getCurrentUserProfile();
    const isComplete = checkProfileCompletion(profile);

    if (!isComplete) {
      redirect("/profile/edit");
    }

    return { isComplete: true };
  } catch (error) {
    console.error("Error checking user profile:", error);
    redirect("/sign-in");
  }
}
