"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/base/components/avatar";
import { Card } from "@/src/base/components/card";
import { Badge } from "@/src/base/components/badge";
import Header from "@/src/base/components/header";
import Footer from "@/src/base/components/footer";
import { getFeedData } from "@/app/actions/daily";
import type { FeedState } from "@/src/daily/types/feed";

export default function FeedContent() {
  const [feedState, setFeedState] = useState<FeedState>({
    dailies: [],
    currentPage: 0,
    isEnd: false,
    isLoading: true,
  });

  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "home"
  );

  const loadInitialData = useCallback(async () => {
    try {
      const data = await getFeedData(0);
      setFeedState((prev) => ({
        ...prev,
        ...data,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to load feed data:", error);
      setFeedState((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  return (
    <main className="flex min-h-screen flex-col bg-[#fef2f2]">
      <Header
        onNotificationClick={() => {
          console.log("Notification clicked");
        }}
      />

      {/* Feed */}
      <div className="flex-1 px-4 py-2">
        {feedState.isLoading ? (
          // Loading skeleton
          <div className="space-y-4">
            {[1, 2].map((key) => (
              <Card
                key={key}
                className="overflow-hidden rounded-3xl bg-white p-0 shadow-sm animate-pulse"
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="aspect-[4/3] w-full bg-gray-200" />
              </Card>
            ))}
          </div>
        ) : (
          <ul className="space-y-4">
            {feedState.dailies.map((daily) => (
              <li key={daily.dailyId}>
                <Card className="overflow-hidden rounded-3xl bg-white p-0 shadow-sm">
                  <div className="flex items-center gap-3 p-4">
                    <Avatar className="h-10 w-10 border border-[#d9d9d9]">
                      <AvatarImage
                        src="/placeholder.svg?height=40&width=40"
                        alt={daily.userNickname}
                      />
                      <AvatarFallback>{daily.userNickname[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-[#450c18]">
                        {daily.userNickname}
                      </h2>
                      <p className="text-sm text-[#888888]">방금 전</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/3] w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={daily.imageUrl}
                        alt="Daily content"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    {/* Tags */}
                    {daily.tags.length > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                        <div className="flex flex-wrap gap-2">
                          {daily.tags.map((tag) => (
                            <Badge
                              key={tag.tagId}
                              variant="secondary"
                              className="bg-white/80 text-[#450c18] hover:bg-white"
                            >
                              {tag.tagName}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
