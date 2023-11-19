import { authTokenCookie } from '@/constants/apis.next'
import { cookies } from 'next/headers'

export async function GET() {
    const token = cookies().get(authTokenCookie);
    return Response.json({
        cookie: token?.value || ''
    })
}