import { NextResponse, type NextRequest } from "next/server"
import { geolocation, ipAddress } from '@vercel/functions'
import { askAI } from '@libs/geminiAI'
import { turso } from "@libs/db";

export async function POST(req: NextRequest) {
  const geo = geolocation(req)
  const ip = ipAddress(req)
  const data = await req.json()

  const WAITING_TIME = 1000 * 60 * 60 * 24; // ms * s * min * hr =  24 hrs

  const selectCount = await turso.execute({ sql: 'select names_generated, last_time_generated from users_log where ip = ?;', args: [ip ?? '000.000.000.000'] })
  const hasGenerated = selectCount.rows.length > 0
  let namesGenerated = 0
  let lastTimeGenerated = 0
  if (hasGenerated) {
    console.log(selectCount.rows)
    namesGenerated = Number(selectCount.rows[0]['names_generated'])
    lastTimeGenerated = Number(selectCount.rows[0]['last_time_generated'])
    const currentTime = Date.now()
    if (namesGenerated > 15) {
      if ((currentTime - lastTimeGenerated) < WAITING_TIME) {
        return new NextResponse(JSON.stringify({ message: 'Has excedido el limite de nombres que puedes generar' }), { status: 429 })
      } else {
        await turso.execute({ sql: 'update users_log set names_generated = 0 where ip = ?', args: [ ip ?? '000.000.000.000'] })
      }
    }
  }


  const { subject, characteristic, meaning, language, keywords } = data

  let prompt = `Generate a name for my ${subject}`

  if (characteristic) prompt += ` that is ${characteristic}`
  if (meaning) prompt += ` that means ${meaning}`
  if (language) prompt += ` in ${language}`
  if (keywords) prompt += ` and has the following keywords: ${keywords}`
  const response = await askAI(prompt)
  if (!response) return new NextResponse(JSON.stringify({ message: 'Error al generar el nombre' }), { status: 500 })

  const { IPA = null, meaning: valueMeaning = null, name = null, advantages = null, disadvantages = null } = JSON.parse(response)[0]
  console.log(response)

  try {
    const result = await turso.execute({ sql: 'INSERT INTO names (created_time, name, meaning, because, pronunciation, subject, characteristic, etymology, language, keywords) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', args: [new Date().toISOString().replace('T', ' '), name, meaning, advantages, IPA, subject, characteristic, valueMeaning, language, keywords] })


    const city = geo.city ?? null
    const country = geo.country ?? null
    const name_id = Number(result.lastInsertRowid)
    const newLastTimeGenerated = Date.now()
    const newIP = ip ?? '000.000.000.000'

    if (hasGenerated) {
      await turso.execute({ sql: 'update users_log set city = ?, country = ?, names_generated = ?, total_names_generated = total_names_generated + 1, last_time_generated = ? where ip = ?', args: [city, country, namesGenerated + 1, lastTimeGenerated, newIP] })
    } else {
      await turso.execute({ sql: 'INSERT INTO users_log (id, ip, city, country, names_generated, name_id, last_time_generated) VALUES (?, ?, ?, ?, ?, ?, ?)', args: [crypto.randomUUID(), newIP, city, country,  1, name_id, newLastTimeGenerated] })

    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return new NextResponse(JSON.stringify({ message: 'Error al guardar el nombre' }),
      { status: 500 })
  }
  return new NextResponse(JSON.stringify({ message: 'Hola desde el servidor!', name, IPA, valueMeaning, advantages, disadvantages }), { status: 200 })
}