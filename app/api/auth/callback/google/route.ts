import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginWithGoogle } from "../../../../../src/auth/apis";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Authorization code is missing");
    redirect(new URL("/sign-in", request.url).toString());
  }

  try {
    const redirectUri = `${process.env.NEXT_PUBLIC_REDIRECT_URI}/api/auth/callback/google`;
    const { accessToken, refreshToken } = await loginWithGoogle(
      code,
      redirectUri
    );

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  } finally {
    redirect(new URL("/", request.url).toString());
  }
}
