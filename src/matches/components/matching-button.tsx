"use client";

import { useState } from "react";
import { Button } from "../../base/components/button";
import { Loader2 } from "lucide-react";
import { requestMatchAction } from "../actions";
import { toast } from "sonner";

export function MatchingButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);
      await requestMatchAction();
      toast.success("매칭이 완료되었습니다!");
    } catch (error) {
      toast.error("매칭에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} className="w-full">
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
