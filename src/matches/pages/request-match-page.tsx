"use client";

import { MatchingButton } from "../components/matching-button";

export function RequestMatchPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <MatchingButton />
      </div>
    </div>
  );
}
