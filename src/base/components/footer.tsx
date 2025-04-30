"use client";

import { Home, User, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export interface FooterProps {
  activeTab: "home" | "matches" | "profile";
  onTabChange: (tab: "home" | "matches" | "profile") => void;
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
  const router = useRouter();

  const handleClick = (tab: "home" | "matches" | "profile") => {
    onTabChange(tab);
    switch (tab) {
      case "home":
        router.push("/");
        break;
      case "matches":
        router.push("/matches");
        break;
      case "profile":
        router.push("/profile/edit");
        break;
    }
  };

  return (
    <nav className="sticky bottom-0 z-10 flex items-center justify-around border-t border-[#d9d9d9] bg-white py-3">
      <button
        onClick={() => handleClick("home")}
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
        onClick={() => handleClick("matches")}
        className={cn(
          "flex flex-col items-center rounded-md p-2",
          activeTab === "matches" ? "text-red-600" : "text-red-950"
        )}
        aria-label="Matches"
        aria-current={activeTab === "matches" ? "page" : undefined}
      >
        <Heart size={24} />
      </button>
      <button
        onClick={() => handleClick("profile")}
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
