import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginWithGoogle } from "../../../../../src/auth/apis";
import { REDIRECT_URL } from "../../../../../src/base/apis/constants";
import { checkProfileCompletion } from "@/src/user/helpers/profile";
import client from "@/src/base/apis/http-client";
import { UserResponse } from "@/src/user/apis/types";

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

    // Use existing client with token override
    const userProfile = await client
      .get("api/v1/users/me", {
        hooks: {
          beforeRequest: [
            (request) => {
              request.headers.set("Authorization", `Bearer ${accessToken}`);
              return request;
            },
          ],
        },
      })
      .json<UserResponse>();

    if (!checkProfileCompletion(userProfile)) {
      redirect(new URL("/profile/edit", request.url).toString());
    }
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    return NextResponse.json({ error: "Bad Request" }, { status: 400 });
  } finally {
    redirect(new URL("/", request.url).toString());
  }
}
