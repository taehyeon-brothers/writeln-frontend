import client from "../../base/apis/http-client";
import type { MatchResponse } from "./types";

/**
 * Request a match with other users
 * @returns Promise with the match response containing matched user IDs and their tags
 */
export async function requestMatch(): Promise<MatchResponse> {
  return await client.post("matches").json<MatchResponse>();
}
