"use client";

import ky from "ky";
import React, { useEffect } from "react";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    const urlSearchParams = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      redirect_uri: `${window.location.origin}/api/auth/callback/google`,
      response_type: "code",
      scope: "openid email profile",
    });

    const oauthUrl = `${
      process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URI
    }?${urlSearchParams.toString()}`;

    window.location.href = oauthUrl;
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleGoogleSignIn}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
}
