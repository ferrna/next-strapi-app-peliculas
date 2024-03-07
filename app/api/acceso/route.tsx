import { URL_API } from '@/config'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, params: any) {
  if (request.method === 'POST') {
    if (request.body && typeof request.body === 'object') {
      const body = await request.json()
      const { identifier, password } = body

      if (identifier && password) {
        const rawData = await fetch(`${URL_API}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier, password }),
        })
        const data = await rawData.json()
        const response = NextResponse.json(data, {
          status: 200,
        })
        response.cookies.set({
          name: 'token',
          value: data.jwt,
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })

        return response
      } 
    } else {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
    }
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

/* const res = NextResponse.next()
      ////
      if (responseData.user) {
        res.cookies.set({
          name: 'token',
          value: responseData.jwt,
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/',
        })
 */
/* import { URL_API } from '@/config'
//@ts-ignore
import cookie from 'cookie'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest, res: any) {
  if (request.method === 'POST') {
    if (request.body && typeof request.body === 'object') {
      //@ts-ignore
      const body = await request.json()
      const { identifier, password } = body
      if (identifier && password) {
        const response = await fetch(`${URL_API}/api/auth/local`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ identifier, password }),
        })
        const responseData = await response.json()
        console.dir(responseData)
        if (responseData.user) {
          res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', responseData.jwt, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== 'development',
              maxAge: 60 * 60 * 24 * 7,
              sameSite: 'strict',
              path: '/',
            })
          )
          return res.status(200).json(responseData)
        } else {
          res.status(responseData.error.status).json({ message: responseData.error })
        }
      }
    }
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Metodo ${request.method} no permitido` })
  }
} */
