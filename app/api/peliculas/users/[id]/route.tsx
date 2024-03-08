import { URL_API } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

// This function will handle remove movie from user's favorites
//TODO
export async function DELETE(request: NextRequest, params: any) {
  const idMovie = params.params.id
  if (!request.cookies.get('token')) {
    return NextResponse.json(
      { message: `Not authorized` },
      {
        status: 401,
      }
    )
  } else {
    const token = request.cookies.get('token') as { name: string; value: string }
    const rawData = await fetch(`${URL_API}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    })
    const user = await rawData.json()
    //
    const response = await fetch(`${URL_API}/api/asdf`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    })
    const data = await response.json()
    return NextResponse.json(data, {
      status: 200,
    })
  }
}
