"use client";

import { Bell, Camera } from "lucide-react";

export interface HeaderProps {
  title?: string;
  onNotificationClick?: () => void;
  onCameraClick?: () => void;
}

export default function Header({
  title = "MatchReal",
  onNotificationClick,
  onCameraClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between bg-[#fef2f2] px-4 py-3">
      <h1 className="text-3xl font-bold text-[#450c18]">
        {title}
        <span className="text-[#450c18]">.</span>
      </h1>
      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="rounded-full p-1 text-[#450c18] hover:bg-[#450c18]/10"
          onClick={onNotificationClick}
        >
          <Bell size={24} />
        </button>
        <button
          aria-label="Camera"
          className="rounded-full p-1 text-[#cc3249] hover:bg-[#cc3249]/10"
          onClick={onCameraClick}
        >
          <Camera size={24} />
        </button>
      </div>
    </header>
  );
}
