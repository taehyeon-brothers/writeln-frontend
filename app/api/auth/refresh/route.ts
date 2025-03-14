import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import ky from "ky";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const next = searchParams.get("next") || "/";

  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await ky
        .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/login/refresh`, {
          json: { refreshToken },
        })
        .json<{ accessToken: string; refreshToken: string }>();

    cookieStore.set("accessToken", newAccessToken);
    cookieStore.set("refreshToken", newRefreshToken);
    const response = NextResponse.redirect(new URL(next, request.url));
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
