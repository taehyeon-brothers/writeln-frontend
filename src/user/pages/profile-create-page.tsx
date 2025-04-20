"use client";

import { useState } from "react";
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
import Header from "@/src/base/components/header";
import Footer from "@/src/base/components/footer";
import { updateProfileAction } from "../actions/profile";
import type { UpdateUserRequest } from "../apis/types";
import { useRouter } from "next/navigation";

export default function ProfileCreatePage() {
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "profile"
  );
  const [formData, setFormData] = useState<UpdateUserRequest>({
    nickname: "",
    gender: undefined,
    age: undefined,
    introduction: "",
    openChatUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof UpdateUserRequest,
    value: string | number | undefined
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const router = useRouter();

  const validateForm = (): boolean => {
    if (formData.nickname && formData.nickname.length > 20) {
      setError("닉네임은 최대 20자까지 입력 가능합니다.");
      return false;
    }
    if (formData.introduction) {
      if (formData.introduction.length < 20) {
        setError("자기소개는 최소 20자 이상 입력해야 합니다.");
        return false;
      }
      if (formData.introduction.length > 200) {
        setError("자기소개는 최대 200자까지 입력 가능합니다.");
        return false;
      }
    }
    if (formData.openChatUrl && formData.openChatUrl.length > 200) {
      setError("오픈채팅 주소는 최대 200자까지 입력 가능합니다.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await updateProfileAction(formData);
      router.push("/");
    } catch (err) {
      setError("프로필 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#fef2f2]">
      <Header
        onNotificationClick={() => {
          // TODO: Implement notification click handler
          console.log("Notification clicked");
        }}
        onCameraClick={() => {
          // TODO: Implement camera click handler
          console.log("Camera clicked");
        }}
      />

      <div className="flex-1 px-4 py-4">
        <h2 className="mb-4 text-2xl font-bold text-red-950">프로필 수정</h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-950">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label
              htmlFor="nickname"
              className="text-red-950 font-semibold text-lg"
            >
              닉네임
            </Label>
            <Input
              id="nickname"
              value={formData.nickname}
              onChange={(e) => handleInputChange("nickname", e.target.value)}
              placeholder="닉네임을 입력하세요 (최대 20자)"
              className="bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="gender"
              className="text-red-950 font-semibold text-lg"
            >
              성별
            </Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleInputChange("gender", value)}
            >
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
              value={formData.age}
              onChange={(e) =>
                handleInputChange("age", parseInt(e.target.value))
              }
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
              value={formData.introduction}
              onChange={(e) =>
                handleInputChange("introduction", e.target.value)
              }
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
              value={formData.openChatUrl}
              onChange={(e) => handleInputChange("openChatUrl", e.target.value)}
              placeholder="오픈채팅 주소를 입력하세요 (최대 200자)"
              className="bg-red-100 font-light px-3 py-6 focus-visible:bg-red-200 transition-colors duration-300 ease-out text-base"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 text-[#fefbfb] hover:bg-[#e15260]/90 text-lg font-medium rounded-xl bg-red-400"
          >
            {isLoading ? "저장 중..." : "저장하기"}
          </Button>
        </form>
      </div>

      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
