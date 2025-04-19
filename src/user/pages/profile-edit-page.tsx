"use client";

import { useState } from "react";
import Header from "@/src/base/components/header";
import Footer from "@/src/base/components/footer";
import { ProfileContainer } from "../components/ProfileContainer";

export default function ProfileEditPage() {
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "profile"
  );

  return (
    <main className="flex flex-1 flex-col bg-rose-50">
      <Header />
      <div className="flex-1 px-4 py-4">
        <ProfileContainer />
      </div>
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
