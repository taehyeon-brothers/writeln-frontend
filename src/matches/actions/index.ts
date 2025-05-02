"use server";

import { requestMatch } from "../api";
import { getUserProfileById } from "../../user/apis";
import type { MatchedUser, MatchResponse } from "../api/types";

export async function requestMatchAction(): Promise<MatchResponse> {
  try {
    return await requestMatch();
  } catch (error) {
    throw error;
  }
}

export async function matchUsers(): Promise<MatchedUser[]> {
  try {
    // 1. 매칭 요청
    const matchResponse = await requestMatch();

    // 2. 매칭된 사용자들의 상세 정보 가져오기
    const userDetails = await Promise.all(
      matchResponse.matchedUserIds.map((userId) => getUserProfileById(userId))
    );

    // 3. 태그 정보와 사용자 정보 결합
    return userDetails.map((user) => ({
      ...user,
      tags: matchResponse.matchedUsersWithTags[user.id] || [],
    }));
  } catch (error) {
    throw error;
  }
}
