"use server";

import { uploadDaily } from "../daily/apis";

export async function uploadDailyPhoto(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    await uploadDaily(file);
    return { success: true };
  } catch (error) {
    console.error("Failed to upload photo:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to upload photo",
    };
  }
}
