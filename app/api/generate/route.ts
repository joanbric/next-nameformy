import { NextResponse, type NextRequest } from "next/server"
import {geolocation, ipAddress} from '@vercel/functions'

export function GET(req: NextRequest) {
  const geo = geolocation(req)
  const ip = ipAddress(req)

  console.log('Hola desde el servidor!', ip, geo)
  
  return new NextResponse(JSON.stringify({message: 'Hola desde el servidor!'}))
}