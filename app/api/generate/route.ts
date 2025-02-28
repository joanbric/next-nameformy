import { NextResponse, type NextRequest } from "next/server"
import { geolocation, ipAddress } from '@vercel/functions'
import { turso } from "@libs/db";

export async function POST(req: NextRequest) {
  const geo = geolocation(req)
  const ip = ipAddress(req)
  const data = await req.json()

  const selectCount = await turso.execute({ sql: 'SELECT COUNT(*) as total FROM users WHERE ip = ?', args: [ip ?? '000.000.000.000'] })
  if (selectCount.rows[0]['total'] && Number(selectCount.rows[0]['total']) > 15)
    return new NextResponse(JSON.stringify({ message: 'Has excedido el limite de nombres que puedes generar' }), { status: 429 })

  const { subject, characteristic, meaning, language, keywords } = data
  try {
    const result = await turso.execute({ sql: 'INSERT INTO names (created_time, name, meaning, because, pronunciation, subject, characteristic, etymology, language, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', args: [Date.now(), 'name', meaning, 'because', 'pronunciation', subject, characteristic, 'etymology', language, keywords] })
    await turso.execute({ sql: 'INSERT INTO users (ip, city, country, name_id) VALUES (?, ?, ?, ?)', args: [ip ?? '000.000.000.000', geo.city ?? null, geo.country ?? null, Number(result.lastInsertRowid)] })
  } catch (err) {
    console.error(err)
    return new NextResponse(JSON.stringify({ message: 'Error al guardar el nombre' }),
      { status: 500 })
  }
  return new NextResponse(JSON.stringify({ message: 'Hola desde el servidor!' }))
}