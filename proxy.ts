import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/admin')) {

    const cookie = request.cookies.get('admin')?.value

    if (cookie !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}