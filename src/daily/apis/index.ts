import client from "../../base/apis/http-client";
import type {
  DailyUploadResponse,
  TagAddRequest,
  AddTagResponse,
  TagRemoveRequest,
  DailyDetailResponse,
  FeedDailyResponses,
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
    .post("daily", {
      body: formData,
    })
    .json<DailyUploadResponse>();
}

/**
 * Get a specific daily content by ID
 * @param dailyId - The ID of the daily to retrieve
 * @returns Promise with the daily details including tags and user information
 */
export async function getDaily(dailyId: number): Promise<DailyDetailResponse> {
  return await client.get(`daily/${dailyId}`).json<DailyDetailResponse>();
}

/**
 * Get a daily image by ID
 * @param dailyId - The ID of the daily to retrieve the image for
 * @returns Promise with the image data as a Blob
 */
export async function getDailyImage(dailyId: number): Promise<Blob> {
  return await client.get(`daily/${dailyId}/image`).blob();
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
    .post(`daily/${dailyId}/tag`, {
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

  await client.delete(`daily/${dailyId}/tag`, {
    json: data,
  });
}

interface GetAllDailiesParams {
  page: number;
  size: number;
}

/**
 * Get all dailies with pagination
 * @param params - Pagination parameters (page number and size)
 * @returns Promise with paginated daily feed responses
 */
export async function getAllDailies({
  page,
  size,
}: GetAllDailiesParams): Promise<FeedDailyResponses> {
  return await client
    .get(`daily/all?page=${page}&size=${size}`)
    .json<FeedDailyResponses>();
}
