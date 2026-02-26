import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname.startsWith('/admin')) {

    const password = request.headers.get('authorization')

    if (password !== Bearer ) {
      return new NextResponse('?????? ????????', {
        status: 401,
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
