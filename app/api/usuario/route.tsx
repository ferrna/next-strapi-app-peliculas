import { URL_API } from '@/config'
import { unstable_noStore } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, params: any) {
  unstable_noStore()
  if (request.method === 'GET') {
    if (!request.cookies.get('token')) {
      return NextResponse.json(
        { message: `Not authorized` },
        {
          status: 401,
        }
      )
    } else {
      const token = request.cookies.get('token') as { name: string; value: string }
      const rawData = await fetch(`${URL_API}/api/users/me?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.value}`,
        },
      })
      const data = await rawData.json()
      return NextResponse.json(data, {
        status: 200,
      })
    }
  } else {
    const response = NextResponse.json(
      { message: `Method ${request.method} not allowed` },
      {
        status: 405,
      }
    )
    response.headers.set('Allow', 'GET')
    return response
  }
}
