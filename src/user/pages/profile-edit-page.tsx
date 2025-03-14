"use client";

import { useState } from "react";
import { Bell, Camera, Home, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Input } from "@/src/base/components/input";
import { Textarea } from "@/src/base/components/textarea";
import { Label } from "@/src/base/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/base/components/select";
import { Button } from "@/src/base/components/button";

export default function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "profile"
  );

  return (
    <main className="flex min-h-screen flex-col bg-[#fef2f2]">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-red-50 px-4 py-3">
        <h1 className="text-3xl font-bold text-red-950">
          MatchReal<span className="text-red-950">.</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="rounded-full p-1 text-red-950 hover:bg-red-950/10"
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

      <div className="flex-1 px-4 py-4">
        <h2 className="mb-4 text-2xl font-bold text-red-950">프로필 수정</h2>

        <div className="space-y-8">
          <div className="space-y-2">
            <Label
              htmlFor="nickname"
              className="text-red-950 font-semibold text-lg"
            >
              닉네임
            </Label>
            <Input
              id="nickname"
              placeholder="닉네임을 입력하세요 (최대 20자)"
              className=" bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-red-950 font-semibold text-lg"
            >
              성별
            </Label>
            <Select>
              <SelectTrigger
                id="gender"
                className="bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
              >
                <SelectValue placeholder="성별을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">남성</SelectItem>
                <SelectItem value="FEMALE">여성</SelectItem>
                <SelectItem value="OTHER">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-red-950 font-semibold text-lg">
              나이
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="나이를 입력하세요"
              className="bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="introduction"
              className="text-red-950 font-semibold text-lg"
            >
              자기소개
            </Label>
            <Textarea
              id="introduction"
              placeholder="자기소개를 입력하세요 (20-200자)"
              className="bg-red-100 px-3 py-4 transition-colors duration-300 ease-out text-base shadow-none border-none focus-visible:bg-red-200"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="openChatUrl"
              className="text-red-950 font-semibold text-lg"
            >
              오픈채팅 주소
            </Label>
            <Input
              id="openChatUrl"
              placeholder="오픈채팅 주소를 입력하세요 (최대 200자)"
              className="bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
            />
          </div>

          <Button className="w-full py-6 text-[#fefbfb] hover:bg-[#e15260]/90 text-lg font-medium rounded-xl bg-red-400">
            저장하기
          </Button>
        </div>
      </div>

      <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t border-[#d9d9d9] bg-white py-3">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "home" ? "text-[#cc3249]" : "text-red-950"
          )}
          aria-label="Home"
          onClick={() => setActiveTab("home")}
        >
          <Home size={24} />
        </Link>
        <Link
          href="/messages"
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "messages" ? "text-[#cc3249]" : "text-red-950"
          )}
          aria-label="Messages"
          onClick={() => setActiveTab("messages")}
        >
          <MessageCircle size={24} />
        </Link>
        <Link
          href="/profile"
          className={cn(
            "flex flex-col items-center rounded-md p-2",
            activeTab === "profile" ? "text-[#cc3249]" : "text-red-950"
          )}
          aria-label="Profile"
          onClick={() => setActiveTab("profile")}
        >
          <User size={24} />
        </Link>
      </nav>
    </main>
  );
}
