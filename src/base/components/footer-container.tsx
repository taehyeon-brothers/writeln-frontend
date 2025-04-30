"use client";

import { useState } from "react";
import Footer from "./footer";

export default function FooterContainer() {
  const [activeTab, setActiveTab] = useState<"home" | "matches" | "profile">(
    "home"
  );

  return <Footer activeTab={activeTab} onTabChange={setActiveTab} />;
}
