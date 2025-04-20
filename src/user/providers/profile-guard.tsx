"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { checkUserProfile } from "../actions/check-profile";

interface ProfileGuardProps {
  children: React.ReactNode;
}

export function ProfileGuard({ children }: ProfileGuardProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const checkProfile = useCallback(async () => {
    await checkUserProfile(pathname);
    setIsLoading(false);
  }, [pathname]);

  useEffect(() => {
    checkProfile();
  }, [checkProfile]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-red-200 rounded-full border-t-red-800 animate-spin" />
      </div>
    );
  }

  return children;
}
