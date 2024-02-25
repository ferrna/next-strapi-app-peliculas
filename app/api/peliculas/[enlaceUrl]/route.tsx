import { NextRequest, NextResponse } from 'next/server'
import datos from '../datos.json'

export function GET(request: NextRequest, params: any) {
  const pelicula = datos.peliculas.filter((peli) => peli.enlaceUrl === params.params.enlaceUrl)
  if (!pelicula) return NextResponse.json({ message: 'Movie not finded' })
  return NextResponse.json(pelicula, { status: 200 })
}
