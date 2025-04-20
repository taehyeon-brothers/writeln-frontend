"use server";

import { getCurrentUserProfile } from "../apis";
import { checkProfileCompletion } from "../helpers/profile";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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

  // TODO: separate check for login status and profile completion
  // Check login status
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    redirect("/sign-in");
  }

  try {
    const profile = await getCurrentUserProfile();
    const isComplete = checkProfileCompletion(profile);

    if (!isComplete) {
      redirect("/profile/create");
    }

    return { isComplete: true };
  } catch (error) {
    console.error("Error checking user profile:", error);
    redirect("/sign-in");
  }
}
