"use server";

import { requestMatch } from "../api";
import type { MatchResponse } from "../api/types";

export async function requestMatchAction(): Promise<MatchResponse> {
  try {
    return await requestMatch();
  } catch (error) {
    throw new Error("Failed to request match");
  }
}
