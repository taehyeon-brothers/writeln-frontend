"use client";

import { useState } from "react";
import { Bell, Camera, Home, MessageCircle, User } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/pages/base/components/avatar";
import { Card } from "@/pages/base/components/card";
import { cn } from "@/lib/utils";

type Post = {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  timeAgo: string;
  imageUrl: string;
  locked: boolean;
};

export default function FeedContent() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      user: {
        name: "Emma Boisson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "EB",
      },
      timeAgo: "10분 전",
      imageUrl: "/placeholder.svg?height=400&width=600",
      locked: true,
    },
    {
      id: "2",
      user: {
        name: "Amanda",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "A",
      },
      timeAgo: "15분 전",
      imageUrl: "/placeholder.svg?height=400&width=600",
      locked: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "home"
  );

  return (
    <main className="flex min-h-screen flex-col bg-[#fef2f2]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#fef2f2] px-4 py-3">
        <h1 className="text-3xl font-bold text-[#450c18]">
          MatchReal<span className="text-[#450c18]">.</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="rounded-full p-1 text-[#450c18] hover:bg-[#450c18]/10"
          >
            <Bell size={24} />
          </button>
          <button
            aria-label="Camera"
            className="rounded-full p-1 text-[#cc3249] hover:bg-[#cc3249]/10"
          >
            <Camera size={24} />
          </button>
        </div>
      </header>

      {/* Feed */}
      <div className="flex-1 px-4 py-2">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id}>
              <Card className="overflow-hidden rounded-3xl bg-white p-0 shadow-sm">
                <div className="flex items-center gap-3 p-4">
                  <Avatar className="h-10 w-10 border border-[#d9d9d9]">
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-[#450c18]">
                      {post.user.name}
                    </h2>
                    <p className="text-sm text-[#888888]">{post.timeAgo}</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-200 to-purple-200 blur-sm">
                    <img
                      src={post.imageUrl || "/placeholder.svg"}
                      alt="Post content"
                      className="h-full w-full object-cover opacity-0"
                    />
                  </div>
                  {post.locked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 text-white">
                      <div className="mb-2 rounded-full bg-white/20 p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <rect
                            width="18"
                            height="11"
                            x="3"
                            y="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <p className="text-center text-lg font-medium">
                        사진을 업로드하고 확인해보세요.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </div>

      {/* Navigation */}
      <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t border-[#d9d9d9] bg-white py-3">
        <button
          onClick={() => setActiveTab("home")}
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "home" ? "text-[#cc3249]" : "text-[#450c18]"
          )}
          aria-label="Home"
          aria-current={activeTab === "home" ? "page" : undefined}
        >
          <Home size={24} />
        </button>
        <button
          onClick={() => setActiveTab("messages")}
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "messages" ? "text-[#cc3249]" : "text-[#450c18]"
          )}
          aria-label="Messages"
          aria-current={activeTab === "messages" ? "page" : undefined}
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "profile" ? "text-[#cc3249]" : "text-[#450c18]"
          )}
          aria-label="Profile"
          aria-current={activeTab === "profile" ? "page" : undefined}
        >
          <User size={24} />
        </button>
      </nav>
    </main>
  );
}
