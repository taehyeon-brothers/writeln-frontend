"use client";

import { Bell, Camera } from "lucide-react";
import { useState } from "react";
import { CameraPage } from "../pages/camera-page";
import { toast } from "sonner";
import { uploadDailyPhoto } from "../actions";

export interface HeaderProps {
  title?: string;
  onNotificationClick?: () => void;
}

export default function Header({
  title = "MatchReal",
  onNotificationClick,
}: HeaderProps) {
  const [showCamera, setShowCamera] = useState(false);

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  const handleCameraClose = () => {
    setShowCamera(false);
  };

  const handlePhotoCapture = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadDailyPhoto(formData);
      console.log("5. 업로드 결과:", result);

      if (result.success) {
        toast.success("사진이 업로드되었습니다.");
        setShowCamera(false);
      } else {
        toast.error(result.error || "사진 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to upload photo:", error);
      toast.error("사진 업로드에 실패했습니다.");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between bg-[#fef2f2] px-4 py-3">
        <h1 className="text-3xl font-bold text-red-950">
          {title}
          <span className="text-red-950">.</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            aria-label="Notifications"
            className="rounded-full p-1 text-red-950 hover:bg-red-950/10"
            onClick={() => {
              onNotificationClick?.();
            }}
          >
            <Bell size={24} />
          </button>
          <button
            aria-label="Camera"
            className="rounded-full p-1 text-[#cc3249] hover:bg-[#cc3249]/10"
            onClick={handleCameraClick}
          >
            <Camera size={24} />
          </button>
        </div>
      </header>

      {showCamera && (
        <CameraPage
          onClose={handleCameraClose}
          onPhotoCapture={handlePhotoCapture}
        />
      )}
    </>
  );
}
