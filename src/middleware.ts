import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'
import { headers } from 'next/headers'

export async function middleware(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if(!session)
        return NextResponse.redirect(new URL('/sign-in', request.url))

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard', "/journal", "/goals", "/finance"],
    runtime: "nodejs"
}