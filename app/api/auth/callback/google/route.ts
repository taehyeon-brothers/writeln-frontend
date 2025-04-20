import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginWithGoogle } from "../../../../../src/auth/apis";
import { REDIRECT_URL } from "../../../../../src/base/apis/constants";
import { checkProfileCompletion } from "@/src/user/helpers/profile";
import { getCurrentUserProfile } from "@/src/user/apis";

export async function GET(request: NextRequest) {
  console.log("request", request);
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("code", code);

  if (!code) {
    console.error("Authorization code is missing");
    redirect(new URL("/sign-in", request.url).toString());
  }

  try {
    const { accessToken, refreshToken } = await loginWithGoogle(
      code,
      REDIRECT_URL
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

    // Use getCurrentUserProfile with access token
    const userProfile = await getCurrentUserProfile();

    if (!checkProfileCompletion(userProfile)) {
      return NextResponse.redirect(new URL("/profile/edit", request.url));
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
