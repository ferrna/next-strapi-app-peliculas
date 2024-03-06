import { URL_API } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, params: any) {
  if (request.method === 'POST') {
    if (request.body && typeof request.body === 'object') {
      //@ts-ignore
      const { username, email, password } = await request.json()
      console.dir(username)
      console.dir(email)
      if (username && password && email) {
        const rawData = await fetch(`${URL_API}/api/auth/local/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        })
        const data = await rawData.json()
        const response = NextResponse.json(data, {
          status: 200,
        })
        return response
      }
    }
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
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
