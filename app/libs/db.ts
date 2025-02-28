import { createClient } from "@libsql/client";
const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

export const turso = (() => {
  if (!url || !authToken) throw new Error('Missing  some environment variables')
  return createClient({
    url,
    authToken,
  })
})()