import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl

  if (url.pathname.startsWith('/admin')) {

    const password = request.headers.get('authorization')

    if (password !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
      return new NextResponse('Доступ запрещён', {
        status: 401,
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}