"use client";

import { REDIRECT_URL } from "@/src/base/apis/constants";
import { Button } from "@/src/base/components/button";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    const urlSearchParams = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: REDIRECT_URL,
      response_type: "code",
      scope: "openid email profile",
    });

    const oauthUrl = `${
      process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URI
    }?${urlSearchParams.toString()}`;

    window.location.href = oauthUrl;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#fef2f2] px-4">
      <div className="w-full max-w-md space-y-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#450c18] md:text-5xl">
            MatchReal<span className="text-[#450c18]">.</span>
          </h1>
          <p className="text-lg text-[#450c18]">결이 맞는 사람을 만나보세요.</p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          className="w-full rounded-full bg-[#e15260] py-6 text-[#fefbfb] hover:bg-[#e15260]/90"
        >
          구글로 로그인하기
        </Button>
      </div>
    </div>
  );
}
