import { authTokenCookie } from "@/constants/apis.next";
import { cookies } from "next/headers";

export async function GET() {
    cookies().set(authTokenCookie, '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/'
    });

    return new Response('success', {
        status: 200
    });
}