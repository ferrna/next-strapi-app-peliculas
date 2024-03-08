import { URL_API } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, params: any) {
  return NextResponse.json(
    { message: 'hello' },
    {
      status: 200,
    }
  )
}
export async function DELETE(request: NextRequest, params: any) {
  if (!request.cookies.get('token')) {
    return NextResponse.json(
      { message: `Not authorized` },
      {
        status: 401,
      }
    )
  }
  try {
    const token = request.cookies.get('token') as { name: string; value: string }
    const rawData = await fetch(`${URL_API}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
    })
    const user = await rawData.json()
    //DELETE MOVIE
    if (user.id) {
      const idMovie = params.params.id
      const response = await fetch(`${URL_API}/api/peliculas/${idMovie}`, {
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
    throw new Error('Ha ocurrido un error al intentar eliminar la pelicula')
  } catch (error: any) {
    return NextResponse.json(
      { message: error.msg },
      {
        status: 401,
      }
    )
  }
}
