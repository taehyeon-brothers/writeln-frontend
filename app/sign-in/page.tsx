"use client";

import ky from "ky";
import React, { useEffect } from "react";

export default function SignInPage() {
  const handleGoogleSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/api/auth/callback/google`;
    const scope = "openid email profile";
    const responseType = "code";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = authUrl;
  };

  useEffect(() => {
    async function exchangeCodeForTokens(code: string) {
      try {
        const response = await ky
          .post("https://oauth2.googleapis.com/token", {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
              code,
              grant_type: "authorization_code",
              redirect_uri: "http://localhost:3000/api/auth/callback/google",
            }),
          })
          .json();

        console.log("Tokens:", response);
      } catch (error) {
        console.error("Error exchanging code for tokens:", error);
      }
    }
  }, []);

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
