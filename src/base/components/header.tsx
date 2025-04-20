"use client";

import { Bell, Camera } from "lucide-react";
import { useState } from "react";
import { CameraPage } from "../pages/camera-page";

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

  const handlePhotoCapture = (file: File) => {
    // TODO: 여기에서 촬영된 사진을 처리합니다
    console.log("Photo captured:", file);
    setShowCamera(false);
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
              // TODO: Implement notification click handler
              console.log("Notification clicked");
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
