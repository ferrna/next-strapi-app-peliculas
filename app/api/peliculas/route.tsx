import { NextRequest, NextResponse } from 'next/server'
import datos from './datos.json'

export function GET(request: NextRequest) {
  return NextResponse.json(datos, { status: 200 })
}
