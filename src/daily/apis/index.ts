import client from "../../base/apis/http-client";
import type {
  DailyUploadResponse,
  TagAddRequest,
  AddTagResponse,
  TagRemoveRequest,
} from "./types";

/**
 * Upload a daily content file
 * @param file - The file to upload
 * @returns Promise with the upload response containing the daily ID
 */
export async function uploadDaily(file: File): Promise<DailyUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);

  return await client
    .post("api/v1/daily", {
      body: formData,
    })
    .json<DailyUploadResponse>();
}

/**
 * Get a specific daily content by ID
 * @param dailyId - The ID of the daily to retrieve
 * @returns Promise with the daily content as a Blob
 */
export async function getDaily(dailyId: number): Promise<Blob> {
  return await client.get(`api/v1/daily/${dailyId}`).blob();
}

/**
 * Add a tag to a daily
 * @param dailyId - The ID of the daily to tag
 * @param tagName - The name of the tag to add
 * @returns Promise with the added tag response
 */
export async function addTagToDaily(
  dailyId: number,
  tagName: string
): Promise<AddTagResponse> {
  const data: TagAddRequest = { tagName };

  return await client
    .post(`api/v1/daily/${dailyId}/tag`, {
      json: data,
    })
    .json<AddTagResponse>();
}

/**
 * Remove a tag from a daily
 * @param dailyId - The ID of the daily
 * @param tagId - The ID of the tag to remove
 * @returns Promise with an empty response
 */
export async function removeTagFromDaily(
  dailyId: number,
  tagId: number
): Promise<void> {
  const data: TagRemoveRequest = { tagId };

  await client.delete(`api/v1/daily/${dailyId}/tag`, {
    json: data,
  });
}
