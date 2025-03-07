import { NextRequest, NextResponse } from "next/server";
import ky from "ky";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    console.error("Authorization code is missing");
    redirect(new URL("/sign-in", request.url).toString());
  }

  try {
    const { accessToken, refreshToken } = await ky
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/login/google`, {
        json: {
          code,
          redirectUri: `${process.env.NEXT_PUBLIC_REDIRECT_URI}/auth/callback/google`,
        },
        credentials: "include",
      })
      .json<{ accessToken: string; refreshToken: string }>();

    const cookieStore = await cookies();
    console.log("accessToken", accessToken);
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
    redirect(new URL("/hello", request.url).toString());
  }
}
