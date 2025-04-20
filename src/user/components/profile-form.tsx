"use client";

import { Input } from "@/src/base/components/input";
import { Label } from "@/src/base/components/label";
import { Textarea } from "@/src/base/components/textarea";
import { useEffect, useState } from "react";
import { useDebounce } from "@/src/hooks/use-debounce";
import Image from "next/image";

interface ProfileFormProps {
  initialData?: {
    nickname: string;
    introduction: string;
    profileImageUrl: string;
  };
  onSave?: (data: { nickname: string; introduction: string }) => void;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    nickname: initialData?.nickname || "",
    introduction: initialData?.introduction || "",
  });

  const debouncedFormData = useDebounce(formData, 200);

  useEffect(() => {
    if (onSave) {
      onSave(debouncedFormData);
    }
  }, [debouncedFormData, onSave]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, nickname: value }));
  };

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, introduction: value }));
  };

  return (
    <div className="flex flex-col items-center gap-12 px-4">
      {/* Profile Image */}
      {initialData?.profileImageUrl ? (
        <Image
          src={initialData.profileImageUrl}
          alt="프로필 이미지"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className="w-24 h-24 rounded-full bg-gray-200"
          data-testid="profile-fallback"
        />
      )}

      {/* Form Container */}
      <div className="w-full max-w-md space-y-8">
        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="nickname">이름</Label>
          <Input
            id="nickname"
            maxLength={20}
            value={formData.nickname}
            onChange={handleNicknameChange}
            placeholder="이름을 입력해주세요"
            className="w-full"
          />
          <div className="text-sm text-gray-500 text-right">
            <span>{formData.nickname.length}</span>/20
          </div>
        </div>

        {/* Introduction Textarea */}
        <div className="space-y-2">
          <Label htmlFor="introduction">자기 소개</Label>
          <Textarea
            id="introduction"
            maxLength={200}
            value={formData.introduction}
            onChange={handleIntroductionChange}
            placeholder="자기소개를 입력해주세요"
            className="w-full min-h-[120px]"
          />
          <div className="text-sm text-gray-500 text-right">
            <span>{formData.introduction.length}</span>/200
          </div>
        </div>
      </div>
    </div>
  );
}
