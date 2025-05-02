"use client";

import { useState } from "react";
import { MatchingButton } from "../components/matching-button";
import { MatchedUsersSlider } from "../components/matched-users-slider";
import type { MatchedUser } from "../components/matched-users-slider";

export function RequestMatchPage() {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[] | null>(null);

  const handleMatchSuccess = (users: MatchedUser[]) => {
    setMatchedUsers(users);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-red-50">
      {matchedUsers ? (
        <div className="w-full h-full">
          <MatchedUsersSlider users={matchedUsers} />
        </div>
      ) : (
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">
              당신과 결이 맞는
              <br />
              소울메이트를 만나보세요
            </h1>
            <p className="text-lg text-gray-600">
              비슷한 삶의 패턴을 가진
              <br />
              당신과 잘 맞는 사람과 함께
              <br />
              서로의 글을 모니터링하며
              <br />
              함께 성장해보세요
            </p>
          </div>
          <MatchingButton onMatchSuccess={handleMatchSuccess} />
        </div>
      )}
    </div>
  );
}
