import { authTokenCookie, defaultTokenExpiresTime } from '@/constants/apis.next';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const { token, age } = await request.json();

    if (token) {
        cookies().set(authTokenCookie, token, {
            maxAge: age ? age : defaultTokenExpiresTime,
            path: '/',
            httpOnly: true
        });
    }

    return new Response('success', {
        status: 200
    });
}