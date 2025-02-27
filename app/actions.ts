'use server'

import { askAI } from '@libs/geminiAI'
type GenerateNameParams = {
  subject: string
  characteristic: string | null
  meaning: string | null
  language: string | null
  keywords: string | null
}

export async function generateName({subject, characteristic, meaning, language, keywords }: GenerateNameParams
) {
subject = 3
  const prompt = `Generate NameForMy finger must be characterictics in language meaning meaning in addition: keywords`
  const response = await askAI(`Generate a name with the following characteristics: ${characteristic}, ${meaning}, ${language}, ${keywords}`)
  const parsRes = JSON.parse(response)

  return {code: 200, res: parsRes}
}