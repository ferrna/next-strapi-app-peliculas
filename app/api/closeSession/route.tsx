import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, params: any) {
  if (request.method === 'POST') {
    const response = NextResponse.json({
      status: 200,
    })
    response.cookies.set({
      name: 'token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expires: new Date(0),
      sameSite: 'strict',
      path: '/',
    })

    return response
  } else {
    const response = NextResponse.json(
      { message: `Metodo ${request.method} no permitido` },
      {
        status: 405,
      }
    )
    response.headers.set('Allow', 'POST')
    return response
  }
}
