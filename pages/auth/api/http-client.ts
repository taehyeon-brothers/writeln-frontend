import ky from "ky";
import { redirect } from "next/navigation";
import type { KyInstance, Options, KyResponse, KyRequest } from "ky";
import { cookies } from "next/headers";

const client: KyInstance = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request: Request) => {
        const cookieStore = cookies();
        const accessToken = await cookieStore.get("accessToken")?.value;
        if (accessToken) {
          request.headers.set(
            "Authorization",
            `Bearer ${`eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzQxMzY0MzQ1LCJleHAiOjE3NDEzNjYxNDV9.Z8K8Ci1gv1Qvo4Dzo1qtRDdBCO8WAcTHw4JrDj-_Oq3IQQMou2B9TR0s18SgnGDWwV-AD40CsniV3GuYpxkpvg`}`
          );
        }
      },
    ],
    afterResponse: [
      async (request: KyRequest, options: Options, response: KyResponse) => {
        if (response.status === 401) {
          const clientRoute = request.headers.get("X-Client-Route") || "/";
          redirect(`/api/auth/refresh?next=${encodeURIComponent(clientRoute)}`);
        }
        return response;
      },
    ],
  },
});

export default client;
