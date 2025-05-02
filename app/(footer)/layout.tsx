"use client";

import Footer from "@/src/base/components/footer";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<"home" | "matches" | "profile">(
    "home"
  );

  return (
    <>
      {children}
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
}
