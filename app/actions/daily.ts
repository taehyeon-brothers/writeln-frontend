"use server";

import { getAllDailies, getDaily, getDailyImage } from "@/src/daily/apis";
import type { FeedDailyWithDetails } from "@/src/daily/types/feed";

const PAGE_SIZE = 20;

export async function getFeedData(page: number): Promise<{
  dailies: FeedDailyWithDetails[];
  currentPage: number;
  isEnd: boolean;
}> {
  try {
    // 1. Get basic feed data
    const feedResponse = await getAllDailies({ page, size: PAGE_SIZE });

    // 2. Get detailed data and images for each daily
    const dailiesWithDetails = await Promise.all(
      feedResponse.dailies.map(async (daily) => {
        try {
          const [details, imageBlob] = await Promise.all([
            getDaily(daily.dailyId),
            getDailyImage(daily.dailyId),
          ]);

          // Convert Blob to base64
          const arrayBuffer = await imageBlob.arrayBuffer();
          const base64String = Buffer.from(arrayBuffer).toString("base64");
          const imageUrl = `data:${imageBlob.type};base64,${base64String}`;

          return {
            ...daily,
            tags: details.tags,
            imageUrl,
          };
        } catch (error) {
          console.error(
            `Failed to fetch details for daily ${daily.dailyId}:`,
            error
          );
          // Return basic data with empty tags and placeholder image if fetch fails
          return {
            ...daily,
            tags: [],
            imageUrl: "/placeholder.svg",
          };
        }
      })
    );

    return {
      dailies: dailiesWithDetails,
      currentPage: feedResponse.currentPage,
      isEnd: feedResponse.isEnd,
    };
  } catch (error) {
    console.error("Failed to fetch feed data:", error);
    throw new Error("Failed to load feed data");
  }
}
