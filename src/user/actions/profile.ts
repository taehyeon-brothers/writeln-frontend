"use server";

import { updateUserProfile } from "../apis";
import type { UpdateUserRequest } from "../apis/types";

export async function updateProfileAction(data: UpdateUserRequest) {
  try {
    await updateUserProfile(data);
  } catch (error) {
    console.error(error);
    throw new Error("프로필 저장 중 오류가 발생했습니다.");
  }
}
