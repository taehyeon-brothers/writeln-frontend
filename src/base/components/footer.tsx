"use client";

import { Home, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  activeTab: "home" | "messages" | "profile";
  onTabChange: (tab: "home" | "messages" | "profile") => void;
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
  return (
    <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t border-[#d9d9d9] bg-white py-3">
      <button
        onClick={() => onTabChange("home")}
        className={cn(
          "flex flex-col items-center rounded-md p-2",
          activeTab === "home" ? "text-red-600" : "text-red-950"
        )}
        aria-label="Home"
        aria-current={activeTab === "home" ? "page" : undefined}
      >
        <Home size={24} />
      </button>
      <button
        onClick={() => onTabChange("messages")}
        className={cn(
          "flex flex-col items-center rounded-md p-2",
          activeTab === "messages" ? "text-red-600" : "text-red-950"
        )}
        aria-label="Messages"
        aria-current={activeTab === "messages" ? "page" : undefined}
      >
        <MessageCircle size={24} />
      </button>
      <button
        onClick={() => onTabChange("profile")}
        className={cn(
          "flex flex-col items-center rounded-md p-2",
          activeTab === "profile" ? "text-red-600" : "text-red-950"
        )}
        aria-label="Profile"
        aria-current={activeTab === "profile" ? "page" : undefined}
      >
        <User size={24} />
      </button>
    </nav>
  );
}
