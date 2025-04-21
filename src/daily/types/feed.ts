import type { FeedDailyResponse, TagDetailResponse } from "../apis/types";

export interface FeedDailyWithDetails extends FeedDailyResponse {
  imageUrl: string;
  tags: TagDetailResponse[];
}

export interface FeedState {
  dailies: FeedDailyWithDetails[];
  currentPage: number;
  isEnd: boolean;
  isLoading: boolean;
}
