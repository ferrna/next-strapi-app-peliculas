import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest, params: any) {
  if (true) return NextResponse.json({ message: 'Movie not finded' })
  return NextResponse.json('', { status: 200 })
}
