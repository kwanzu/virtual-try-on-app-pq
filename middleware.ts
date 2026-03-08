import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Basic middleware - session management will be handled by Supabase client-side
  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
