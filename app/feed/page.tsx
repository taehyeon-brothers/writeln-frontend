import type { Metadata } from "next";
import FeedContent from "@/src/feed/components/feed-content";

export const metadata: Metadata = {
  title: "MatchReal - Feed",
  description: "Connect with people who match your style on MatchReal",
  openGraph: {
    title: "MatchReal - Feed",
    description: "Connect with people who match your style on MatchReal",
    type: "website",
  },
};

export default function FeedPage() {
  return <FeedContent />;
}
