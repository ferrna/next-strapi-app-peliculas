import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/users/acceso', request.url))
  }
  return NextResponse.next()
}
export const config = {
  matcher: ['/peliculas/editar/:path*', '/peliculas/crear'],
}
