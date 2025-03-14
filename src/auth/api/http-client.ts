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
          request.headers.set("Authorization", `Bearer ${accessToken}`);
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
