"use client";

import { useState } from "react";
import Footer from "./footer";

export default function FooterContainer() {
  const [activeTab, setActiveTab] = useState<"home" | "messages" | "profile">(
    "profile"
  );

  return <Footer activeTab={activeTab} onTabChange={setActiveTab} />;
}
