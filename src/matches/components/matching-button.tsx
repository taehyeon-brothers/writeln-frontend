"use client";

import { useState } from "react";
import { Button } from "../../base/components/button";
import { Loader2 } from "lucide-react";
import { matchUsers } from "../actions";
import type { MatchedUser } from "./matched-users-slider";

interface MatchingButtonProps {
  onMatchSuccess: (users: MatchedUser[]) => void;
}

export function MatchingButton({ onMatchSuccess }: MatchingButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const matchedUsers = await matchUsers();
      onMatchSuccess(matchedUsers);
    } catch (error) {
      console.error("Failed to match users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className="w-full bg-red-400 hover:bg-red-500"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          매칭 중...
        </>
      ) : (
        "매칭하기"
      )}
    </Button>
  );
}
