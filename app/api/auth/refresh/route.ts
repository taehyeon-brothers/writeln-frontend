import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { refresh } from "../../../../src/auth/apis";

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
      await refresh(refreshToken);

    cookieStore.set("accessToken", newAccessToken);
    cookieStore.set("refreshToken", newRefreshToken);
    const response = NextResponse.redirect(new URL(next, request.url));
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
}
